import { classNames } from 'shared/lib/classNames/classNames'
import React, {
    Context,
    forwardRef,
    HTMLAttributeAnchorTarget,
    memo,
} from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TextAlign } from 'shared/ui/Text/Text'
import {
    ListProps, Virtuoso, VirtuosoGrid,
} from 'react-virtuoso'
import { useSelector } from 'react-redux'
import { StateSchema } from 'app/providers/StoreProvider'
import { getSafeScrollByPAth } from 'widgets/Page'
import { useLocation } from 'react-router-dom'
import styled from '@emotion/styled'
import cls from './ArticleList.module.scss'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { Article, ArticleView } from '../../model/types/article'
import { ArticleListItemSkeleton } from '../../ui/ArticleListItem/ArticleListItemSceleton'

interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view?: ArticleView
    onLoadNextPage?: () => void
    target?: HTMLAttributeAnchorTarget
}

const ListEl = styled.div`
      display: flex;
      flex-wrap: wrap;
      gap: 30px;
    `

const CurrentList = forwardRef<
    HTMLDivElement,
    ListProps & { context?: Context<unknown> }
>((props, ref) => (<ListEl {...props} ref={ref} />))

const getSkeleton = (view: ArticleView) => new Array(view === ArticleView.CARDS ? 6 : 3)
    .fill(0)
// eslint-disable-next-line react/no-array-index-key
    .map((_, i) => <ArticleListItemSkeleton key={Date.now() + i} className={cls.card} view={view} />)

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        target,
        className,
        articles,
        isLoading,
        view = ArticleView.CARDS,
        onLoadNextPage,
    } = props

    const { t } = useTranslation()
    const { pathname } = useLocation()
    const scrollPosition = useSelector((state: StateSchema) => getSafeScrollByPAth(state, pathname))

    const cn = classNames(cls.ArticleList, {}, [className, cls[view]])
    const renderArticles = (article: Article) => (
        <ArticleListItem
            className={cls.card}
            key={article.id}
            article={article}
            view={view}
            target={target}
        />
    )

    if (!isLoading && !articles.length) {
        return (
            <div className={cls.text}>
                <Text
                    title={t('Articles not found')}
                    align={TextAlign.CENTER}
                />
            </div>
        )
    }

    const node = document.getElementById('PAGE_ID') as HTMLDivElement

    return (
        view === 'LIST'
            ? (
                <Virtuoso
                    customScrollParent={node}
                    initialScrollTop={scrollPosition}
                    className={cn}
                    overscan={3}
                    style={{ height: '100vh' }}
                    data={articles}
                    totalCount={articles.length}
                    endReached={onLoadNextPage}
                    components={{
                        // eslint-disable-next-line react/no-unstable-nested-components
                        ScrollSeekPlaceholder: () => (
                            <div>
                                {getSkeleton(view)}
                            </div>
                        ),
                    }}
                    itemContent={(index, article) => renderArticles(article)}
                />
            )
            : (
                <VirtuosoGrid
                    customScrollParent={node}
                    className={cn}
                    overscan={9}
                    style={{ height: '100vh' }}
                    data={articles}
                    totalCount={articles.length}
                    endReached={onLoadNextPage}
                    components={{
                        List: CurrentList,
                        // eslint-disable-next-line react/no-unstable-nested-components
                        ScrollSeekPlaceholder: () => (
                            <div>
                                {getSkeleton(view)}
                            </div>
                        ),
                    }}
                    itemContent={(index, article) => renderArticles(article)}
                />
            )
    )
})

import { classNames } from 'shared/lib/classNames/classNames'
import React, {
    Context, forwardRef, HTMLAttributeAnchorTarget, memo,
} from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TextAlign } from 'shared/ui/Text/Text'
import { ListProps, Virtuoso, VirtuosoGrid } from 'react-virtuoso'
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
    hasMore?: boolean
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

const ListFooter = () => new Array(3)
    .fill(0)
// eslint-disable-next-line react/no-array-index-key
    .map((_, i) => (<ArticleListItemSkeleton key={i} className={cls.card} view={ArticleView.LIST} />))

const CardFooter = () => (
    <div className={cls.CARDS}>
        {
            new Array(6)
                .fill(0)
            // eslint-disable-next-line react/no-array-index-key
                .map((_, i) => (<ArticleListItemSkeleton key={i} className={cls.card} view={ArticleView.CARDS} />))
        }
    </div>
)

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        target,
        className,
        articles,
        isLoading,
        view = ArticleView.CARDS,
        onLoadNextPage,
        hasMore,
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

    // const node = document.getElementById('PAGE_ID') as HTMLDivElement
    // node.scrollTop = scrollPosition

    return (
        view === 'LIST'
            ? (
                <Virtuoso
                    useWindowScroll
                    // customScrollParent={node}
                    initialScrollTop={scrollPosition}
                    className={cn}
                    overscan={3}
                    style={{ height: '100vh' }}
                    data={articles}
                    totalCount={articles.length}
                    endReached={onLoadNextPage}
                    components={{
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        Footer: hasMore && ListFooter,
                    }}
                    itemContent={(index, article) => renderArticles(article)}
                />
            )
            : (
                <VirtuosoGrid
                    // ref={virtuoso}
                    useWindowScroll
                    // customScrollParent={node}
                    className={cn}
                    overscan={9}
                    style={{
                        height: '100%', width: '100%',
                    }}
                    data={articles}
                    totalCount={articles.length}
                    endReached={onLoadNextPage}
                    components={{
                        List: CurrentList,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        Footer: hasMore && CardFooter,
                    }}
                    itemContent={(index, article) => renderArticles(article)}
                />
            )
    )
})

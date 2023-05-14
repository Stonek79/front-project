import React, { HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text, TextAlign } from '@/shared/ui/Text'
import cls from './ArticleList.module.scss'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { Article, ArticleViewTypes } from '../../model/types/article'
import { ArticleListItemSkeleton } from '../../ui/ArticleListItem/ArticleListItemSceleton'
import { ArticleView } from '../../model/consts/consts';

// TODO add virtualization

interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view?: ArticleViewTypes
    target?: HTMLAttributeAnchorTarget
}

const getSkeleton = (view: ArticleViewTypes) => new Array(view === ArticleView.CARDS ? 6 : 3)
    .fill(0)
// eslint-disable-next-line react/no-array-index-key
    .map((_, i) => <ArticleListItemSkeleton key={i} className={cls.card} view={view} />)

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        target,
        className,
        articles,
        isLoading,
        view = ArticleView.CARDS,
    } = props
    const { t } = useTranslation()
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

    return (
        <div data-testid="ArticleList" className={cn}>
            {articles?.length > 0
                ? articles?.map(renderArticles)
                : null}
            {isLoading && getSkeleton(view) }
        </div>
    )
})

import { classNames } from 'shared/lib/classNames/classNames'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSceleton'
import { Article, ArticleView } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import cls from './ArticleList.module.scss'

interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view?: ArticleView
}

const getSkeleton = (view: ArticleView) => new Array(view === ArticleView.CARDS ? 6 : 3)
    .fill(0)
// eslint-disable-next-line react/no-array-index-key
    .map((_, i) => <ArticleListItemSkeleton key={Date.now() + i} className={cls.card} view={view} />)

export const ArticleList = memo((props: ArticleListProps) => {
    const {
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
        />
    )

    return (
        <div className={cn}>
            {articles?.length > 0
                ? articles?.map(renderArticles)
                : null}
            {isLoading && getSkeleton(view) }
        </div>
    )
})

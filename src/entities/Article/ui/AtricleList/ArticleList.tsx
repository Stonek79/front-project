import { classNames } from 'shared/lib/classNames/classNames'
import React, { FC, memo } from 'react'
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

const getSkeleton = (view: ArticleView) => new Array(view === ArticleView.CARDS ? 9 : 3)
    .fill(<ArticleListItemSkeleton className={cls.card} view={view} />)

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.CARDS,
    } = props
    const { t } = useTranslation()
    const cn = classNames(cls.ArticleList, {}, [className, cls[view]])

    if (isLoading) {
        return (
            <div className={cn}>
                { getSkeleton(view) }
            </div>
        )
    }
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
        </div>
    )
})

import React, { HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/redesigned/Text'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { Article, ArticleViewTypes } from '../../model/types/article'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import { ArticleView } from '../../model/consts/consts'
import { HStack } from '@/shared/ui/redesigned/Stack'

interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view?: ArticleViewTypes
    target?: HTMLAttributeAnchorTarget
    updateViews?: (article: Article) => void
}

const getSkeleton = (view: ArticleViewTypes) =>
    new Array(view === ArticleView.CARDS ? 6 : 3)
        .fill(0)
        // eslint-disable-next-line react/no-array-index-key
        .map((_, i) => <ArticleListItemSkeleton key={i} view={view} />)

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        target,
        className,
        articles,
        isLoading,
        view = ArticleView.CARDS,
        updateViews,
    } = props
    const { t } = useTranslation()

    const renderArticles = (article: Article) => (
        <ArticleListItem
            className={className}
            key={article.id}
            article={article}
            view={view}
            target={target}
            updateViews={updateViews}
        />
    )

    if (!isLoading && !articles.length) {
        return (
            <HStack justify="center">
                <Text title={t('Articles not found')} align="center" />
            </HStack>
        )
    }

    return (
        <HStack wrap="wrap" gap="32" data-testid="ArticleList">
            {articles?.length > 0 ? articles?.map(renderArticles) : null}
            {isLoading && getSkeleton(view)}
        </HStack>
    )
})

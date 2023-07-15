import React, { HTMLAttributeAnchorTarget, memo } from 'react'
import { Article, ArticleViewTypes } from '../../model/types/article'
import { ToggleComponentFeatures } from '@/shared/lib/features'
import { ArticleListItemRedesigned } from '../ArticleListItemRedesigned/ArticleListItemRedesigned'
import { ArticleListItemDeprecated } from '../ArticleListItemDeprecated/ArticleListItemDeprecated'

export interface ArticleListItemProps {
    className?: string
    article: Article
    view: ArticleViewTypes
    target?: HTMLAttributeAnchorTarget
    index?: number
    updateViews?: (article: Article) => void
}

export const ArticleListItem = memo((props: ArticleListItemProps) => (
    <ToggleComponentFeatures
        feature="isAppRedesigned"
        on={<ArticleListItemRedesigned {...props} />}
        off={<ArticleListItemDeprecated {...props} />}
    />
))

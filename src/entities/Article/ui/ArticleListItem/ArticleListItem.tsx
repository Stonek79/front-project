import React, { HTMLAttributeAnchorTarget, memo } from 'react'
import { Article, ArticleViewTypes } from '../../model/types/article'
import { ArticleListItemRedesigned } from '../ArticleListItemRedesigned/ArticleListItemRedesigned'

export interface ArticleListItemProps {
    className?: string
    article: Article
    view: ArticleViewTypes
    target?: HTMLAttributeAnchorTarget
    index?: number
    updateViews?: (article: Article) => void
}

export const ArticleListItem = memo((props: ArticleListItemProps) => (
    <ArticleListItemRedesigned {...props} />
))

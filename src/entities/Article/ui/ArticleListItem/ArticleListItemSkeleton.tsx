import React, { memo } from 'react'
import { ArticleViewTypes } from '../../model/types/article'
import { ArticleListItemSkeletonRedesigned } from '../ArticleListItemRedesigned/ArticleListItemSceletonRedesigned'

export interface ArticleListItemSkeletonProps {
    className?: string
    view: ArticleViewTypes
}

export const ArticleListItemSkeleton = memo(
    (props: ArticleListItemSkeletonProps) => {
        const { className, view } = props
        return (
            <ArticleListItemSkeletonRedesigned
                className={className}
                view={view}
            />
        )
    },
)

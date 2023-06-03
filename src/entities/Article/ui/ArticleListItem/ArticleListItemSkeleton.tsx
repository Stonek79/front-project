import React, { memo } from 'react'
import { ArticleViewTypes } from '../../model/types/article'
import { ToggleComponentFeatures } from '@/shared/lib/features'
import { ArticleListItemSkeletonDeprecated } from '../ArticleListItemDeprecated/ArticleListItemSceletonDeprecated'
import { ArticleListItemSkeletonRedesigned } from '../ArticleListItemRedesigned/ArticleListItemSceletonRedesigned'

export interface ArticleListItemSkeletonProps {
    className?: string
    view: ArticleViewTypes
}

export const ArticleListItemSkeleton = memo(
    (props: ArticleListItemSkeletonProps) => {
        const { className, view } = props
        return (
            <ToggleComponentFeatures
                feature="isAppRedesigned"
                on={
                    <ArticleListItemSkeletonRedesigned
                        className={className}
                        view={view}
                    />
                }
                off={
                    <ArticleListItemSkeletonDeprecated
                        className={className}
                        view={view}
                    />
                }
            />
        )
    },
)

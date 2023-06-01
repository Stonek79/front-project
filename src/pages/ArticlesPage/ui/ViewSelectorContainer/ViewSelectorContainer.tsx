import { memo } from 'react'
import { ArticleViewSelector } from '@/features/ArticleViewSelector'
import { UseArticlesFilter } from '../../lib/hooks/useArticlesFilter'

interface ViewSelectorContainerProps {
    className?: string
}

export const ViewSelectorContainer = memo(
    (props: ViewSelectorContainerProps) => {
        const { className } = props

        const { view, onChangeView } = UseArticlesFilter()

        return (
            <ArticleViewSelector
                className={className}
                view={view}
                onViewClick={onChangeView}
            />
        )
    },
)

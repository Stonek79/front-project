import { memo } from 'react'
import { ArticleViewSelector } from '@/widgets/ArticleViewSelector'
import { useArticlesFilter } from '../../lib/hooks/useArticlesFilter'

interface ViewSelectorContainerProps {
    className?: string
}

export const ViewSelectorContainer = memo(
    (props: ViewSelectorContainerProps) => {
        const { className } = props

        const { view, onChangeView } = useArticlesFilter()

        return (
            <ArticleViewSelector
                className={className}
                view={view}
                onViewClick={onChangeView}
            />
        )
    },
)

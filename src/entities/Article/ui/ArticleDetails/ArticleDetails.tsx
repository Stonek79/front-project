import { memo } from 'react'
import { ToggleComponentFeatures } from '@/shared/lib/features'
import { ArticleDetailsRedesigned } from '../ArticleDetailsRedesigned/ArticleDetailsRedesigned'
import { ArticleDetailsDeprecated } from '../ArticleDetailsDeprecated/ArticleDetailsDeprecated'

interface ArticleDetailsProps {
    className?: string
    id?: string
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props

    return (
        <ToggleComponentFeatures
            feature="isAppRedesigned"
            on={<ArticleDetailsRedesigned className={className} id={id} />}
            off={<ArticleDetailsDeprecated className={className} id={id} />}
        />
    )
})

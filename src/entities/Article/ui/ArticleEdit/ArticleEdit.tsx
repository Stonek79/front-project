import { ToggleComponentFeatures } from '@/shared/lib/features'
import { ArticleEditRedesigned } from '../ArticleEditRedesigned/ArticleEditRedesigned'
import { ArticleEditDeprecated } from '../ArticleEditDeprecated/ArticleEditDeprecated'

export interface ArticleEditProps {
    className?: string
    id: string
}

export const ArticleEdit = (props: ArticleEditProps) => {
    const { className, id } = props

    return (
        <ToggleComponentFeatures
            feature="isAppRedesigned"
            on={<ArticleEditRedesigned id={id} className={className} />}
            off={<ArticleEditDeprecated id={id} className={className} />}
        />
    )
}

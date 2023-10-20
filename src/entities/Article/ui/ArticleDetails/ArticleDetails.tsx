import { memo } from 'react'
import { ArticleDetailsRedesigned } from '../ArticleDetailsRedesigned/ArticleDetailsRedesigned'

interface ArticleDetailsProps {
    className?: string
    id?: string
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props

    return <ArticleDetailsRedesigned className={className} id={id} />
})

import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { ArticleDetails } from '@/entities/Article'
import { Card } from '@/shared/ui/redesigned/Card'

interface DetailsContainerProps {
    className?: string
}

export const DetailsContainer = memo((props: DetailsContainerProps) => {
    const { className } = props
    const { id = '1' } = useParams<{ id: string }>()

    return (
        <Card max className={className} cardPaddings="24" cardBorder="standard">
            <ArticleDetails id={id} />
        </Card>
    )
})

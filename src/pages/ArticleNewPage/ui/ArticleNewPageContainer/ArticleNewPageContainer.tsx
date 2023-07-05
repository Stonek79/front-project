import { memo } from 'react'
import { useSelector } from 'react-redux'
import { getArticleDetailsFormData } from '@/entities/Article'
import { Card } from '@/shared/ui/redesigned/Card'
import { ArticleEditAdditionBlock } from '@/widgets/ArticleEditAdditionInfo'

export const ArticleNewPageContainer = memo(() => {
    const articleData = useSelector(getArticleDetailsFormData)

    if (!articleData) return null

    return (
        <Card cardPaddings="32" cardBorder="rounded">
            <ArticleEditAdditionBlock article={articleData} />
        </Card>
    )
})

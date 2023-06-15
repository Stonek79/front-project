import { memo } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleEditPageContainer.module.scss'
import { getArticleDetailsFormData } from '@/entities/Article'
import { Card } from '@/shared/ui/redesigned/Card'
import { ArticleEditAdditionBlock } from '@/widgets/ArticleEditAdditionInfo'

interface ArticleEditPageContainerProps {
    className?: string
}

export const ArticleEditPageContainer = memo(
    (props: ArticleEditPageContainerProps) => {
        const { className } = props
        const article = useSelector(getArticleDetailsFormData)

        const cn = classNames(cls.ArticleEditPageContainer, {}, [className])

        if (!article) return null

        return (
            <Card className={cn} cardPaddings="32" cardBorder="rounded">
                <ArticleEditAdditionBlock article={article} />
            </Card>
        )
    },
)

import { memo } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleEditPageContainer.module.scss'
import { getArticleDetailsData } from '@/entities/Article'
import { Card } from '@/shared/ui/redesigned/Card'
import { ArticleEditAdditionBlock } from '@/widgets/ArticleEditAdditionInfo'

interface ArticleEditPageContainerProps {
    className?: string
}

export const ArticleEditPageContainer = memo(
    (props: ArticleEditPageContainerProps) => {
        const { className } = props
        const article = useSelector(getArticleDetailsData)

        const cn = classNames(cls.AdditionalInfoContainer, {}, [className])

        if (!article) return null

        const { views, createdAt, user } = article

        return (
            <Card className={cn} cardPaddings="24" cardBorder="rounded">
                <ArticleEditAdditionBlock
                    views={views}
                    createdAt={createdAt}
                    author={user}
                />
            </Card>
        )
    },
)

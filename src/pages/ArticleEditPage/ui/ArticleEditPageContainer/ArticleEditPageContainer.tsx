import { memo } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleEditPageContainer.module.scss'
import { Article, getArticleDetailsFormData } from '@/entities/Article'
import { Card } from '@/shared/ui/redesigned/Card'
import { ArticleEditAdditionBlock } from '@/widgets/ArticleEditAdditionInfo'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { ArticleDeleteButton } from '@/widgets/ArticleDeleteButton'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { articlesPageActions } from '../../../ArticlesPage/models/slices/articlesPageSlice'

interface ArticleEditPageContainerProps {
    className?: string
}

export const ArticleEditPageContainer = memo(
    (props: ArticleEditPageContainerProps) => {
        const { className } = props
        const article = useSelector(getArticleDetailsFormData)
        const dispatch = useAppDispatch()

        const cn = classNames(cls.ArticleEditPageContainer, {}, [className])

        if (!article) return null

        const onDelete = (id?: string) => {
            dispatch(articlesPageActions.deleteData(id))
        }

        const onUpdate = (article: Article) => {
            dispatch(articlesPageActions.upsertArticle(article))
        }

        return (
            <VStack gap="32" max>
                <Card className={cn} cardPaddings="32" cardBorder="rounded">
                    <ArticleEditAdditionBlock
                        upsertArticle={onUpdate}
                        article={article}
                    />
                </Card>
                <ArticleDeleteButton onDelete={onDelete} id={article.id} />
            </VStack>
        )
    },
)

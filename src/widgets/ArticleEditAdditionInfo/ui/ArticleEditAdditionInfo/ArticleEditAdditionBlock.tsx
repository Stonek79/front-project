import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleEditAdditionBlock.module.scss'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Button } from '@/shared/ui/redesigned/Button'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Article, articleDetailsActions, editArticle } from '@/entities/Article'
import { ArticleAddBlocksContainer } from '@/features/ArticleAddBlocksContainer'

interface ArticleEditAdditionBlockProps {
    className?: string
    article: Article
}

export const ArticleEditAdditionBlock = memo(
    (props: ArticleEditAdditionBlockProps) => {
        const { className, article } = props
        const { t } = useTranslation()
        const dispatch = useAppDispatch()
        const navigate = useNavigate()

        const cn = classNames(cls.ArticleEditAdditionInfo, {}, [className])

        const onCancelEdit = useCallback(() => {
            dispatch(articleDetailsActions.cancelEdit())
        }, [dispatch])

        const onSave = useCallback(() => {
            if (article) dispatch(editArticle(article))
        }, [article, dispatch])

        const onBack = useCallback(() => {
            navigate(-1)
        }, [navigate])

        return (
            <VStack gap="32" className={cn}>
                <ArticleAddBlocksContainer articleData={article} />
                <VStack gap="16">
                    <Button
                        fullWidth
                        variant="filled"
                        color="error"
                        onClick={onCancelEdit}
                    >
                        {t('Cancel edit')}
                    </Button>
                    <Button
                        fullWidth
                        variant="filled"
                        color="success"
                        onClick={onSave}
                    >
                        {t('Save')}
                    </Button>
                    <Button fullWidth variant="outline" onClick={onBack}>
                        {t('Back')}
                    </Button>
                </VStack>
            </VStack>
        )
    },
)

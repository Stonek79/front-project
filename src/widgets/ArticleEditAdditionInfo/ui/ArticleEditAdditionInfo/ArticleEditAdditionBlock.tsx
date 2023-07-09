import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleEditAdditionBlock.module.scss'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Button } from '@/shared/ui/redesigned/Button'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
    addNewArticle,
    Article,
    articleDetailsActions,
    editArticle,
} from '@/entities/Article'
import { ArticleAddBlocksContainer } from '@/features/ArticleAddBlocksContainer'
import { ConfirmationModal } from '@/features/ConfirmationModal'
import { getRouteArticleEdit, getRouteNotFound } from '@/shared/const/router'

interface ArticleEditAdditionBlockProps {
    className?: string
    article: Article
    isNew?: boolean
}

export const ArticleEditAdditionBlock = memo(
    (props: ArticleEditAdditionBlockProps) => {
        const { className, article, isNew = false } = props
        const { t } = useTranslation()
        const dispatch = useAppDispatch()
        const navigate = useNavigate()
        const [isOpen, setIsOpen] = useState(false)

        const cn = classNames(cls.ArticleEditAdditionInfo, {}, [className])

        const onOpenModal = useCallback(() => {
            setIsOpen(true)
        }, [])

        const onCloseModal = useCallback(() => {
            setIsOpen(false)
        }, [])

        const onSave = useCallback(() => {
            if (article && isNew) {
                try {
                    dispatch(addNewArticle(article))
                    navigate(getRouteArticleEdit(article.id))
                } catch (e) {
                    navigate(getRouteNotFound())
                }
            } else if (article) {
                dispatch(editArticle(article))
            }
        }, [article, dispatch, isNew, navigate])

        const onBack = useCallback(() => {
            navigate(-1)
        }, [navigate])

        const onConfirm = useCallback(() => {
            dispatch(articleDetailsActions.cancelEdit())
            onCloseModal()
        }, [dispatch, onCloseModal])

        return (
            <VStack gap="32" className={cn}>
                <ArticleAddBlocksContainer articleData={article} />
                <VStack gap="16">
                    <Button
                        fullWidth
                        variant="filled"
                        color="error"
                        onClick={onOpenModal}
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
                {isOpen && (
                    <ConfirmationModal
                        isOpen={isOpen}
                        header={`${t('Confirm cancellation')}?`}
                        onClose={onCloseModal}
                        onConfirm={onConfirm}
                    />
                )}
            </VStack>
        )
    },
)

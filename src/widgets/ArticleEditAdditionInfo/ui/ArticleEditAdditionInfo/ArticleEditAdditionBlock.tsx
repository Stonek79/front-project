import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleEditAdditionBlock.module.scss'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Button } from '@/shared/ui/redesigned/Button'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
    Article,
    articleDetailsActions,
    useAddNewArticleMutation,
    useEditArticleMutation,
} from '@/entities/Article'
import { ArticleAddBlocksContainer } from '@/features/ArticleAddBlocksContainer'
import { ConfirmationModal } from '@/features/ConfirmationModal'
import { getRouteArticleEdit, getRouteNotFound } from '@/shared/const/router'
import { SuccessModal } from '@/features/SuccessModal'

interface ArticleEditAdditionBlockProps {
    className?: string
    article: Article
    isNew?: boolean
    upsertArticle?: (article: Article) => void
}

export const ArticleEditAdditionBlock = memo(
    (props: ArticleEditAdditionBlockProps) => {
        const { className, article, isNew = false, upsertArticle } = props
        const { t } = useTranslation()
        const dispatch = useAppDispatch()
        const navigate = useNavigate()
        const [isOpen, setIsOpen] = useState(false)
        const [isOpenSuccess, setIsOpenSuccess] = useState(false)
        const [successText, setSuccessText] = useState('')
        const [addNewArticle] = useAddNewArticleMutation()
        const [editArticle] = useEditArticleMutation()
        const cn = classNames(cls.ArticleEditAdditionInfo, {}, [className])

        const onOpenModal = useCallback(() => {
            setIsOpen(true)
        }, [])

        const onCloseModal = useCallback(() => {
            setIsOpen(false)
        }, [])

        const onCloseSuccess = useCallback(() => {
            setIsOpenSuccess(false)
        }, [])

        const onSave = useCallback(() => {
            const { user, ...rest } = article

            if (article && isNew && upsertArticle) {
                try {
                    addNewArticle({ ...rest, userId: user.id })
                        .unwrap()
                        .then(() => {
                            upsertArticle(article)
                            navigate(getRouteArticleEdit(article.id))
                        })
                } catch (e) {
                    navigate(getRouteNotFound())
                }
            } else if (article && upsertArticle) {
                editArticle({ ...rest })
                    .unwrap()
                    .then((res) => {
                        setIsOpenSuccess(true)
                        upsertArticle(res)
                        setSuccessText(
                            'The article has been successfully edited',
                        )
                        setTimeout(() => setIsOpenSuccess(false), 2000)
                    })
            }
        }, [
            article,
            isNew,
            upsertArticle,
            addNewArticle,
            navigate,
            editArticle,
        ])

        const onBack = useCallback(() => {
            if (isNew) {
                navigate('/articles')
            }
        }, [isNew, navigate])

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
                    {isNew && (
                        <Button fullWidth variant="outline" onClick={onBack}>
                            {t('Back')}
                        </Button>
                    )}
                </VStack>
                {isOpen && (
                    <ConfirmationModal
                        isOpen={isOpen}
                        header={`${t('Confirm cancellation')}?`}
                        onClose={onCloseModal}
                        onConfirm={onConfirm}
                    />
                )}
                {isOpenSuccess && (
                    <SuccessModal
                        text={successText}
                        onClose={onCloseSuccess}
                        isOpen={isOpenSuccess}
                    />
                )}
            </VStack>
        )
    },
)

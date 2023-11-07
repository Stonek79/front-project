import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { useDeleteArticleMutation } from '@/entities/Article'
import { getRouteArticles } from '@/shared/const/router'
import { ArticleDelete } from '@/features/ArticleDelete'
import { ConfirmationModal } from '@/features/ConfirmationModal'

interface ArticleDeleteButtonProps {
    id: string
    onDelete: (id?: string) => void
}

export const ArticleDeleteButton = (props: ArticleDeleteButtonProps) => {
    const { id, onDelete } = props
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const [deleteArticle] = useDeleteArticleMutation()

    const onOpenModal = useCallback(() => {
        setIsOpen(true)
    }, [])

    const onCloseModal = useCallback(() => {
        setIsOpen(false)
    }, [])

    const onHandleDelete = useCallback(() => {
        console.log('delete', id)
        deleteArticle(id)
            .unwrap()
            .then(() => {
                onDelete(id)
                return navigate(getRouteArticles())
            })
    }, [deleteArticle, id, onDelete, navigate])

    return (
        <>
            <ArticleDelete onClick={onOpenModal} id={id} />
            {isOpen && (
                <ConfirmationModal
                    isOpen={isOpen}
                    header={`${t('Delete article')}?`}
                    onClose={onCloseModal}
                    onConfirm={onHandleDelete}
                />
            )}
        </>
    )
}

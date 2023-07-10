import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { deleteArticle } from '@/entities/Article'
import { getRouteArticles } from '@/shared/const/router'
import { ArticleDelete } from '@/features/ArticleDelete'
import { ConfirmationModal } from '@/features/ConfirmationModal'

interface ArticleDeleteButtonProps {
    id: string
    hasUpdate?: () => void
}

export const ArticleDeleteButton = (props: ArticleDeleteButtonProps) => {
    const { id, hasUpdate } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const onOpenModal = useCallback(() => {
        setIsOpen(true)
    }, [])

    const onCloseModal = useCallback(() => {
        setIsOpen(false)
    }, [])

    const onDelete = useCallback(() => {
        if (id) {
            dispatch(deleteArticle(id))

            if (hasUpdate) hasUpdate()

            navigate(getRouteArticles())
        }
    }, [dispatch, hasUpdate, id, navigate])

    return (
        <>
            <ArticleDelete onClick={onOpenModal} id={id} />
            {isOpen && (
                <ConfirmationModal
                    isOpen={isOpen}
                    header={`${t('Delete article')}?`}
                    onClose={onCloseModal}
                    onConfirm={onDelete}
                />
            )}
        </>
    )
}

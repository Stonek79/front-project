import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Text } from '@/shared/ui/redesigned/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AddCommentForm } from '@/features/AddCommentForm'
import { CommentList } from '@/entities/Comment'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { fetchCommentsByArticleId } from '../../model/services/FetchCommentsByArticleId/fetchCommentsByArticleId'
import { addCommentForArticle } from '../../model/services/AddCommentForArticle/AddCommentForArticle'
import { getArticleComments } from '../../model/slices/articleDetailCommentSlice'
import { getIsLoadingComments } from '../../model/selectors/comments'

interface ArticleDetailsCommentsProps {
    className?: string
    id?: string
}

export const ArticleDetailsComments = memo(
    (props: ArticleDetailsCommentsProps) => {
        const { className, id } = props
        const { t } = useTranslation()
        const comments = useSelector(getArticleComments.selectAll)
        const commentsIsLoading = useSelector(getIsLoadingComments)
        const dispatch = useAppDispatch()

        const onSendComment = useCallback(
            (text: string) => {
                dispatch(addCommentForArticle(text))
            },
            [dispatch],
        )

        useInitialEffect(() => {
            dispatch(fetchCommentsByArticleId(id))
        })

        const cn = classNames('', {}, [className])

        return (
            <VStack gap="8" max className={cn}>
                <Text size="l" title={t('Comments')} />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </VStack>
        )
    },
)

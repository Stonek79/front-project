import { ArticleDetails } from 'entities/Article';
import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useParams } from 'react-router-dom'
import { Text } from 'shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { CommentList } from 'entities/Comment'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { fetchCommentsByArticleId } from 'entities/Comment/model/services/fetchCommentsByArticleId'
import { getIsLoadingComments } from '../../model/selectors/comments'
import { articleDetailsCommentReduces, getArticleComments } from '../../model/slices/articleDetailCommentSlice'
import cls from './ArticleDetailPage.module.scss'

interface ArticleDetailPageProps {
    className?: string;
}

const reducers: ReducersList = {
    comments: articleDetailsCommentReduces,
}

const ArticleDetailPage = memo((props: ArticleDetailPageProps) => {
    const { className } = props
    const { id } = useParams<{ id: string }>()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getIsLoadingComments)

    const cn = classNames(cls.ArticleDetailPage, {}, [className])

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    })
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={cn}>
                {id && (
                    <>
                        <ArticleDetails id={id} />
                        <Text title={t('Comments')} className={cls.commentTitle} />
                        <CommentList isLoading={commentsIsLoading} comments={comments} />
                    </>
                )}
            </div>
        </DynamicModuleLoader>
    )
})

export default memo(ArticleDetailPage)

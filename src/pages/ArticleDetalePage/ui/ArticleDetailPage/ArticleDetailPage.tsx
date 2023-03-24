import { ArticleDetails } from 'entities/Article';
import { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useNavigate, useParams } from 'react-router-dom'
import { Text } from 'shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { CommentList } from 'entities/Comment'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { AddCommentForm } from 'features/addCommentForm'
import { Button } from 'shared/ui/Button/Button'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Page } from 'shared/ui/Page/Page'
import { fetchCommentsByArticleId } from '../../model/services/FetchCommentsByArticleId/fetchCommentsByArticleId'
import { getIsLoadingComments } from '../../model/selectors/comments'
import { articleDetailsCommentReduces, getArticleComments } from '../../model/slices/articleDetailCommentSlice'
import cls from './ArticleDetailPage.module.scss'
import { addCommentForArticle } from '../../model/services/AddCommentForArticle/AddCommentForArticle'

interface ArticleDetailPageProps {
    className?: string;
}

const reducers: ReducersList = {
    comments: articleDetailsCommentReduces,
}

const ArticleDetailPage = memo((props: ArticleDetailPageProps) => {
    const { className } = props
    const { id = '1' } = useParams<{ id: string }>()
    const { t } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getIsLoadingComments)

    const cn = classNames(cls.ArticleDetailPage, {}, [className])

    const onBackToArticles = useCallback(() => {
        navigate(RoutePath.articles)
    }, [navigate])

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text))
    }, [dispatch])

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    })

    if (!id) {
        return (
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </Page>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={cn}>
                <Button onClick={onBackToArticles}>
                    {t('Back to articles')}
                </Button>
                <ArticleDetails id={id} />
                <Text title={t('Comments')} className={cls.commentTitle} />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList isLoading={commentsIsLoading} comments={comments} />
            </Page>
        </DynamicModuleLoader>
    )
})

export default memo(ArticleDetailPage)

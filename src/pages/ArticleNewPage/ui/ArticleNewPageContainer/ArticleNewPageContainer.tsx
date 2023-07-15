import { memo } from 'react'
import { useSelector } from 'react-redux'
import { Article, getArticleDetailsFormData } from '@/entities/Article'
import { Card } from '@/shared/ui/redesigned/Card'
import { ArticleEditAdditionBlock } from '@/widgets/ArticleEditAdditionInfo'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { articlesPageActions } from '../../../ArticlesPage/models/slices/articlesPageSlice'

export const ArticleNewPageContainer = memo(() => {
    const articleData = useSelector(getArticleDetailsFormData)
    const dispatch = useAppDispatch()

    if (!articleData) return null

    const setArticle = (article: Article) => {
        dispatch(articlesPageActions.upsertArticle(article))
    }

    return (
        <Card cardPaddings="32" cardBorder="rounded">
            <ArticleEditAdditionBlock
                upsertArticle={setArticle}
                isNew
                article={articleData}
            />
        </Card>
    )
})

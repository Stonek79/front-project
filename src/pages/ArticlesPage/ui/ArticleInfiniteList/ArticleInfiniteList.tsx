import { memo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Article, ArticleList } from '@/entities/Article'
import {
    articlesPageActions,
    getArticles,
} from '../../models/slices/articlesPageSlice'
import {
    getArticlesPageError,
    getArticlesView,
    getIsLoadingArticles,
} from '../../models/selectors/articlesPageSelectors'
import { Text } from '@/shared/ui/redesigned/Text'
import cls from './ArticleInfiniteList.module.scss'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

interface ArticleInfiniteListProps {
    className?: string
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
    const { className } = props
    const articles = useSelector(getArticles.selectAll)
    const isLoading = useSelector(getIsLoadingArticles)
    const view = useSelector(getArticlesView)
    const error = useSelector(getArticlesPageError)
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const cn = classNames(cls.ArticleInfiniteList, {}, [className])

    if (error) {
        return <Text text={t('Error loading articles')} />
    }

    const updateViews = (article: Article) => {
        dispatch(articlesPageActions.upsertArticle(article))
    }

    return (
        <ArticleList
            className={cn}
            isLoading={isLoading}
            view={view}
            articles={articles}
            updateViews={updateViews}
        />
    )
})

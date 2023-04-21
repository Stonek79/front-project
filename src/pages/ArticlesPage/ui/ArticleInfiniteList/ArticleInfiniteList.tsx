import { classNames } from 'shared/lib/classNames/classNames'
import { memo } from 'react'
import { ArticleList } from 'entities/Article'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { getArticles } from '../../models/slices/articlesPageSlice'
import {
    getArticlesView,
    getIsLoadingArticles,
} from '../../models/selectors/articlesPageSelectors'
import { initArticlesPage } from '../../models/services/initArticlesPage'
import cls from './ArticleInfiniteList.module.scss'

interface ArticleInfiniteListProps {
    className?: string
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
    const { className } = props
    const dispatch = useAppDispatch()
    const articles = useSelector(getArticles.selectAll)
    const isLoading = useSelector(getIsLoadingArticles)
    const view = useSelector(getArticlesView)
    const [searchParams] = useSearchParams()

    const cn = classNames(cls.ArticleInfiniteList, {}, [className])

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams))
    });

    return (
        <ArticleList
            className={cn}
            isLoading={isLoading}
            view={view}
            articles={articles}
        />
    )
})

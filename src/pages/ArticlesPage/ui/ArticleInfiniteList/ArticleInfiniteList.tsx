import { memo } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleList } from '@/entities/Article'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
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
    const articles = useSelector(getArticles.selectAll) // TODO fix page loaders
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

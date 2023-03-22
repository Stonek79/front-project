import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleList, ArticleView } from 'entities/Article'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useSelector } from 'react-redux'
import { ArticleViewSelector } from 'features/ArticleViewSelector/ArticleViewSelector'
import { fetchArticlesList } from '../../models/services/fetchArticlesList'
import { articlesPageActions, articlesPageReducer, getArticles } from '../../models/slices/articlesPageSlice'
import cls from './ArticlesPage.module.scss'
import {
    getArticlesPageError,
    getArticlesView,
    getIsLoadingArticles,
} from '../../models/selectors/articlesPageSelectors'

interface ArticlesPageProps {
    className?: string;
}

const reducer: ReducersList = {
    articlesPage: articlesPageReducer,
}

const ArticlesPage = memo((props: ArticlesPageProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const articles = useSelector(getArticles.selectAll)
    const isLoading = useSelector(getIsLoadingArticles)
    const error = useSelector(getArticlesPageError)
    const view = useSelector(getArticlesView)

    const cn = classNames(cls.ArticlesPage, {}, [className])

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view))
    }, [dispatch])

    useInitialEffect(() => {
        dispatch(fetchArticlesList())
        dispatch(articlesPageActions.initStore())
    })

    return (
        <DynamicModuleLoader reducers={reducer}>
            <div className={cn}>
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                />
            </div>
        </DynamicModuleLoader>
    )
})

export default memo(ArticlesPage)

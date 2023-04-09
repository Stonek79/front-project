import {
    memo, useCallback,
} from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleList } from 'entities/Article'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useSelector } from 'react-redux'
import { Page } from 'widgets/Page/ui/Page/Page'
import { Text, TextAlign } from 'shared/ui/Text/Text'
import { useSearchParams } from 'react-router-dom'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'
import { initArticlesPage } from '../../models/services/initArticlesPage'
import { fetchNextArticlesPage } from '../../models/services/fetchNextArticlesPage'
import { articlesPageReducer, getArticles } from '../../models/slices/articlesPageSlice'
import cls from './ArticlesPage.module.scss'
import {
    getArticlesHasMore,
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

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props
    const dispatch = useAppDispatch()
    const articles = useSelector(getArticles.selectAll)
    const isLoading = useSelector(getIsLoadingArticles)
    const error = useSelector(getArticlesPageError)
    const view = useSelector(getArticlesView)
    const hasMore = useSelector(getArticlesHasMore)
    const [searchParams] = useSearchParams()

    const cn = classNames(cls.ArticlesPage, {}, [className])

    const onLoadNextPage = useCallback(() => {
        if (hasMore) {
            dispatch(fetchNextArticlesPage())
        }
    }, [dispatch, hasMore])

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams))
    });

    if (error) {
        return (
            <Page onScrollEnd={onLoadNextPage} isLoading={isLoading} className={cn}>
                <Text align={TextAlign.CENTER} text={error} />
            </Page>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducer} removeAfterUnmount={false}>
            <Page isLoading={isLoading} className={cn}>
                <ArticlesPageFilters />
                <ArticleList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                    className={cls.list}
                    onLoadNextPage={onLoadNextPage}
                    hasMore={hasMore}
                />
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticlesPage)

import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Page } from '@/widgets/Page'
import { ArticleInfiniteList } from '../../ui/ArticleInfiniteList/ArticleInfiniteList'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'
import { articlesPageReducer } from '../../models/slices/articlesPageSlice'
import cls from './ArticlesPage.module.scss'
import { getArticlesHasMore } from '../../models/selectors/articlesPageSelectors'
import { ArticlesPageGreating } from '@/features/ArticlesPageGreating'
import { ToggleComponentFeatures } from '@/shared/lib/features'
import { StickyLayout } from '@/shared/layouts'
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer'
import { FiltersContainer } from '../FiltersContainer/FiltersContainer'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { initArticlesPage } from '../../models/services/initArticlesPage'
import { getArticleIsLoadingData } from '@/entities/Article'
import { fetchNextArticlesPage } from '../../models/services/fetchNextArticlesPage'

interface ArticlesPageProps {
    className?: string
}

const reducer: ReducersList = {
    articlesPage: articlesPageReducer,
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props
    const dispatch = useAppDispatch()
    const isLoading = useSelector(getArticleIsLoadingData)
    const hasMore = useSelector(getArticlesHasMore) || true
    const [searchParams] = useSearchParams()

    const cn = classNames(cls.ArticlesPage, {}, [className])

    const onLoadNextPage = useCallback(() => {
        if (hasMore && !isLoading) {
            dispatch(fetchNextArticlesPage())
        }
    }, [dispatch, hasMore, isLoading])

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams))
    })

    const content = (
        <ToggleComponentFeatures
            feature="isAppRedesigned"
            on={
                <StickyLayout
                    left={<ViewSelectorContainer />}
                    right={<FiltersContainer />}
                    content={
                        <Page
                            data-testid="ArticlesPage"
                            onScrollEnd={onLoadNextPage}
                            className={cn}
                        >
                            <ArticleInfiniteList />
                            <ArticlesPageGreating />
                        </Page>
                    }
                />
            }
            off={
                <Page
                    data-testid="ArticlesPage"
                    onScrollEnd={onLoadNextPage}
                    className={cn}
                >
                    <ArticlesPageFilters />
                    <ArticleInfiniteList />
                    <ArticlesPageGreating />
                </Page>
            }
        />
    )
    return (
        <DynamicModuleLoader reducers={reducer} removeAfterUnmount={false}>
            {content}
        </DynamicModuleLoader>
    )
}

export default memo(ArticlesPage)

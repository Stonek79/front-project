import { memo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
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
import { ArticlesPageGreating } from '@/features/ArticlesPageGreating'
import { ToggleComponentFeatures } from '@/shared/lib/features'
import { StickyLayout } from '@/shared/layouts'
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer'
import { FiltersContainer } from '../FiltersContainer/FiltersContainer'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { initArticlesPage } from '../../models/services/initArticlesPage'
import { fetchNextArticlesPage } from '../../models/services/fetchNextArticlesPage'
import { getArticleIsLoadingData } from '@/entities/Article'
import { useResize } from '@/shared/lib/hooks/useResize/useResize'

interface ArticlesPageProps {
    className?: string
}

const reducer: ReducersList = {
    articlesPage: articlesPageReducer,
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props
    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams()
    const isLoading = useSelector(getArticleIsLoadingData)
    const { isScreenMd } = useResize()

    const cn = classNames(cls.ArticlesPage, {}, [className])

    const onLoadNextPage = useCallback(() => {
        dispatch(fetchNextArticlesPage())
    }, [dispatch])

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams))
    })

    const content = (
        <ToggleComponentFeatures
            feature="isAppRedesigned"
            on={
                isScreenMd ? (
                    <StickyLayout
                        left={<ViewSelectorContainer />}
                        right={<FiltersContainer />}
                        content={
                            <Page
                                data-testid="ArticlesPage"
                                onScrollEnd={onLoadNextPage}
                                className={cn}
                                isLoading={isLoading}
                            >
                                <ArticleInfiniteList />
                                <ArticlesPageGreating />
                            </Page>
                        }
                    />
                ) : (
                    <Page
                        data-testid="ArticlesPage"
                        onScrollEnd={onLoadNextPage}
                        className={cn}
                        isLoading={isLoading}
                    >
                        <ArticleInfiniteList />
                        <ArticlesPageGreating />
                    </Page>
                )
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

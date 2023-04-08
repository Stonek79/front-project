import { classNames } from 'shared/lib/classNames/classNames'
import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ArticleViewSelector } from 'features/ArticleViewSelector/ArticleViewSelector'
import { ArticleSortField, ArticleView } from 'entities/Article'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Card } from 'shared/ui/Card/Card'
import { Input } from 'shared/ui/Input/Input'
import { ArticlesSortSelector } from 'features/ArticlesSortSelector/ArticlesSortSelector'
import { SortOrder } from 'shared/types'
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce'
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs'
import { ArticleType } from 'entities/Article/model/types/article'
import { ArticleTypeTabs } from 'features/ArticleTypeTabs/ArticleTypeTabs'
import cls from './ArticlesPageFilters.module.scss'
import { fetchArticlesList } from '../../models/services/fetchArticlesList'
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesView,
} from '../../models/selectors/articlesPageSelectors'
import { articlesPageActions } from '../../models/slices/articlesPageSlice'

interface ArticlesPageFiltersProps {
    className?: string
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
    const { className } = props
    const { t } = useTranslation()
    const view = useSelector(getArticlesView)
    const order = useSelector(getArticlesPageOrder)
    const sort = useSelector(getArticlesPageSort)
    const search = useSelector(getArticlesPageSearch)
    const type = useSelector(getArticlesPageType)
    const dispatch = useAppDispatch()

    const cn = classNames(cls.ArticlesPageFilters, {}, [className])

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }))
    }, [dispatch])

    const debounceFetchData = useDebounce(fetchData, 500)

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
    }, [dispatch, fetchData])

    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlesPageActions.setOrder(newOrder))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
    }, [dispatch, fetchData])

    const onChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(newSort))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
    }, [dispatch, fetchData])

    const onChangeSearch = useCallback((newSearch: string) => {
        dispatch(articlesPageActions.setSearch(newSearch))
        dispatch(articlesPageActions.setPage(1))
        debounceFetchData()
    }, [debounceFetchData, dispatch])

    const onChangeType = useCallback((value) => {
        dispatch(articlesPageActions.setType(value))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
    }, [dispatch, fetchData])

    return (
        <div className={cn}>
            <div className={cls.sortWrapper}>
                <ArticlesSortSelector
                    sort={sort}
                    order={order}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
            </div>
            <Card className={cls.search}>
                <Input
                    value={search}
                    onChange={onChangeSearch}
                    placeholder={t('Search')}
                />
            </Card>
            <ArticleTypeTabs
                value={type}
                onChangeType={onChangeType}
                className={cls.tabs}
            />
        </div>
    )
})
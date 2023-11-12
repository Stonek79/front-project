import { useSelector } from 'react-redux'
import { useCallback } from 'react'
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesView,
} from '../../models/selectors/articlesPageSelectors'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
    ArticleSortFieldTypes,
    ArticleTypesType,
    ArticleViewTypes,
} from '@/entities/Article'
import { articlesPageActions } from '../../models/slices/articlesPageSlice'
import { SortOrder } from '@/shared/types/sort'
import { fetchArticlesList } from '../../models/services/fetchArticlesList'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'

export const useArticlesFilter = () => {
    const view = useSelector(getArticlesView)
    const order = useSelector(getArticlesPageOrder)
    const sort = useSelector(getArticlesPageSort)
    const search = useSelector(getArticlesPageSearch)
    const type = useSelector(getArticlesPageType)
    const dispatch = useAppDispatch()

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }))
    }, [dispatch])

    const debounceFetchData = useDebounce(fetchData, 500)

    const onChangeView = useCallback(
        (view: ArticleViewTypes) => {
            dispatch(articlesPageActions.setView(view))
            dispatch(articlesPageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData],
    )

    const onChangeOrder = useCallback(
        (newOrder: SortOrder) => {
            dispatch(articlesPageActions.setOrder(newOrder))
            dispatch(articlesPageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData],
    )

    const onChangeSort = useCallback(
        (newSort: ArticleSortFieldTypes) => {
            dispatch(articlesPageActions.setSort(newSort))
            dispatch(articlesPageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData],
    )

    const onChangeSearch = useCallback(
        (newSearch: string) => {
            dispatch(articlesPageActions.setSearch(newSearch))
            dispatch(articlesPageActions.setPage(1))
            debounceFetchData()
        },
        [debounceFetchData, dispatch],
    )

    const onChangeType = useCallback(
        (value: ArticleTypesType) => {
            dispatch(articlesPageActions.setType(value))
            dispatch(articlesPageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData],
    )

    return {
        view,
        order,
        sort,
        search,
        type,
        onChangeView,
        onChangeOrder,
        onChangeSort,
        onChangeSearch,
        onChangeType,
    }
}

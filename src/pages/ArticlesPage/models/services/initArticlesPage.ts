import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { SortOrder } from '@/shared/types/sort'
import { ArticleSortFieldTypes, ArticleTypesType } from '@/entities/Article'
import { articlesPageActions } from '../../models/slices/articlesPageSlice'
import { fetchArticlesList } from '../../models/services/fetchArticlesList'
import { getArticlesPageInited } from '../../models/selectors/articlesPageSelectors'

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searchParams, thunkAPI) => {
    const { getState, dispatch } = thunkAPI
    const inited = getArticlesPageInited(getState())

    if (!inited) {
        const orderFromUrl = searchParams.get('order') as SortOrder
        const sortFromUrl = searchParams.get('sort') as ArticleSortFieldTypes
        const searchFromUrl = searchParams.get('search')
        const typeFromUrl = searchParams.get('type') as ArticleTypesType

        if (orderFromUrl) {
            dispatch(articlesPageActions.setOrder(orderFromUrl))
        }

        if (sortFromUrl) {
            dispatch(articlesPageActions.setSort(sortFromUrl))
        }

        if (searchFromUrl) {
            dispatch(articlesPageActions.setSearch(searchFromUrl))
        }

        if (typeFromUrl) {
            dispatch(articlesPageActions.setType(typeFromUrl))
        }

        dispatch(articlesPageActions.initState())

        dispatch(fetchArticlesList({}))
    }
})

import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { articlesPageActions } from '../../models/slices/articlesPageSlice'
import { fetchArticlesList } from '../../models/services/fetchArticlesList'
import {
    getArticlesHasMore,
    getArticlesPages,
} from '../../models/selectors/articlesPageSelectors'
import { getArticleIsLoadingData } from '@/entities/Article'

export const fetchNextArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('articlesPage/fetchNextArticlesPage', async (_, thunkAPI) => {
    const { getState, dispatch } = thunkAPI
    const hasMore = getArticlesHasMore(getState())
    const page = getArticlesPages(getState())
    const isLoading = getArticleIsLoadingData(getState())
    const length = getState()?.articlesPage?.ids.length

    console.log(length, 'length')
    try {
        if (!length) {
            dispatch(fetchArticlesList({}))
        } else if (hasMore && !isLoading) {
            dispatch(articlesPageActions.setPage(page + 1))

            dispatch(fetchArticlesList({}))
        }
    } catch (e) {
        console.log(e)
    }
})

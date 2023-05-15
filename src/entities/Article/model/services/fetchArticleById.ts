import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Article } from '../types/article'

export const fetchArticleById = createAsyncThunk<
    Article,
    string | undefined,
    ThunkConfig<string>
>('article/fetchArticleById', async (articleId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
        if (!articleId) {
            return rejectWithValue('404')
        }

        const res = await extra.api.get<Article>(`/articles/${articleId}`, {
            params: {
                _expand: 'user',
            },
        })

        if (!res.data) {
            return rejectWithValue(res.status === 404 ? '404' : 'server error')
        }

        return res.data
    } catch (e: any | unknown) {
        if (e.response.status === 404) {
            return rejectWithValue('404')
        }
        return rejectWithValue('server error')
    }
})

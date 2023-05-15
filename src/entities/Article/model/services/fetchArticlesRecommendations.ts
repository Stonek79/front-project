import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Article } from '../types/article'

export const fetchArticlesRecommendations = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>(
    'articlesRecommendations/fetchArticlesRecommendations',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const res = await extra.api.get<Article[]>('/articles', {
                params: {
                    _limit: 4,
                },
            })

            if (!res.data) {
                return rejectWithValue(
                    res.status === 404 ? '404' : 'server error',
                )
            }

            return res.data
        } catch (e: any | unknown) {
            if (e.response.status === 404) {
                return rejectWithValue('404')
            }
            return rejectWithValue('server error')
        }
    },
)

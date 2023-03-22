import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'

export const fetchArticlesList = createAsyncThunk<
    Article[],
    void,
    ThunkConfig<string>
>(
    'articlesPage/fetchArticlesList',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const res = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                },
            })

            if (!res.data) {
                return rejectWithValue(res.status === 404 ? '404' : 'server error')
            }

            return res.data
        } catch (e: any | unknown) {
            console.log(e)
            if (e.response.status === 404) {
                return rejectWithValue('404')
            }
            return rejectWithValue('server error')
        }
    },
)

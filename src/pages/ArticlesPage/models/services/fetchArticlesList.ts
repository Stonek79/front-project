import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'
import { getArticlesLimit } from '../../models/selectors/articlesPageSelectors'

interface ArticlesListProps {
    page?: number
}
export const fetchArticlesList = createAsyncThunk<
    Article[],
    ArticlesListProps,
    ThunkConfig<string>
>(
    'articlesPage/fetchArticlesList',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI
        const { page = 1 } = props
        const limit = getArticlesLimit(getState())

        try {
            const res = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
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

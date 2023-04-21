import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article, ArticleTypes } from 'entities/Article'
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams'
import {
    getArticlesLimit,
    getArticlesPageOrder,
    getArticlesPages,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
} from '../../models/selectors/articlesPageSelectors'

interface ArticlesListProps {
    replace?: boolean
}
export const fetchArticlesList = createAsyncThunk<
    Article[],
    ArticlesListProps,
    ThunkConfig<string>
>(
    'articlesPage/fetchArticlesList',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI
        const page = getArticlesPages(getState())
        const limit = getArticlesLimit(getState())
        const order = getArticlesPageOrder(getState())
        const sort = getArticlesPageSort(getState())
        const search = getArticlesPageSearch(getState())
        const type = getArticlesPageType(getState())

        try {
            addQueryParams({
                order, sort, search, type,
            })
            const res = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
                    _order: order,
                    _sort: sort,
                    q: search,
                    type: type === ArticleTypes.ALL ? undefined : type,
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

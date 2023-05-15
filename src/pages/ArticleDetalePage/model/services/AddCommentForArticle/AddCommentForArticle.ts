import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { getArticleDetailsData } from '@/entities/Article'
import { Comment } from '@/entities/Comment'
import { getUserAuthData } from '@/entities/User'
import { fetchCommentsByArticleId } from '../../services/FetchCommentsByArticleId/fetchCommentsByArticleId'

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>('article/addCommentForArticle', async (text, thunkAPI) => {
    const { dispatch, extra, rejectWithValue, getState } = thunkAPI

    const userData = getUserAuthData(getState())
    const article = getArticleDetailsData(getState())

    if (!userData || !text || !article) {
        return rejectWithValue('no data')
    }

    try {
        const { data } = await extra.api.post<Comment>('/comments', {
            articleId: article.id,
            userId: userData.id,
            text,
        })

        if (!data) {
            throw Error('server error')
        }

        dispatch(fetchCommentsByArticleId(article.id))

        return data
    } catch (e: any | unknown) {
        return rejectWithValue(e.message)
    }
})

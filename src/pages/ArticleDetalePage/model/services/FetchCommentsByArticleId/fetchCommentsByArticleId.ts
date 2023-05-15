import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Comment } from '@/entities/Comment'

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkConfig<string>
>('comments/fetchCommentsByArticleId', async (articleId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
        const res = await extra.api.get<Comment[]>('/comments/', {
            params: {
                articleId,
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

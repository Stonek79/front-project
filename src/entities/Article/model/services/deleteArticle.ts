import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { setDeleteArticleMutation } from '../../api/articlesApi'
import { Article } from '../../model/types/article'

export const deleteArticle = createAsyncThunk<
    Article,
    string,
    ThunkConfig<string>
>('article/deleteArticle', async (articleId, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI

    if (!articleId) {
        return rejectWithValue('no article ID')
    }

    try {
        const res = await dispatch(setDeleteArticleMutation(articleId)).unwrap()

        if (!res) {
            return rejectWithValue('server error')
        }

        return res
    } catch (e: any | unknown) {
        console.log(e)
        return rejectWithValue('server error')
    }
})

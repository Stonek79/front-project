import { createAsyncThunk } from '@reduxjs/toolkit'
import { Article } from '../types/article'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { setEditArticleMutation } from '../../api/articlesApi'

export const editArticle = createAsyncThunk<
    Article,
    Article,
    ThunkConfig<string>
>('article/editArticle', async (articleData, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI

    if (!articleData) {
        return rejectWithValue('no article data')
    }

    try {
        const res = await dispatch(
            setEditArticleMutation({
                ...articleData,
            }),
        ).unwrap()

        if (!res) {
            return rejectWithValue('server error')
        }

        return res
    } catch (e: any | unknown) {
        console.log(e)
        return rejectWithValue('server error')
    }
})

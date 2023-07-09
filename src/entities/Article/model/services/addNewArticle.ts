import { createAsyncThunk } from '@reduxjs/toolkit'
import { Article } from '../types/article'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { setNewArticleMutation } from '../../api/articlesApi'

export const addNewArticle = createAsyncThunk<
    Article,
    Article,
    ThunkConfig<string>
>('article/addNewArticle', async (newArticle, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI

    if (!newArticle) {
        return rejectWithValue('no article data')
    }

    try {
        const { user, ...rest } = newArticle

        const res = await dispatch(
            setNewArticleMutation({ ...rest, userId: user.id }),
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

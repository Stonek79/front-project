import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { getUserDataByIdQuery } from '../../api/userApi'
import { User } from '../types/user'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstarage'

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (_, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI

        const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''

        if (!userId) {
            return rejectWithValue('user not found')
        }

        try {
            return await dispatch(getUserDataByIdQuery(userId)).unwrap()
        } catch (e: any | unknown) {
            console.log(e)
            return rejectWithValue('server error')
        }
    },
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { getUserDataByIdQuery } from '../../api/userApi'
import { User } from '../types/user'
import {
    LOCAL_STORAGE_CURRENT_DESIGN_KEY,
    USER_LOCALSTORAGE_KEY,
} from '@/shared/const/localstarage'
import { setFeatureFlags } from '@/shared/lib/features'

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (_, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI

        const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY)

        if (!userId) {
            setFeatureFlags({ isAppRedesigned: true })
            return rejectWithValue('server error')
        }

        try {
            const result = await dispatch(getUserDataByIdQuery(userId)).unwrap()

            localStorage.setItem(
                LOCAL_STORAGE_CURRENT_DESIGN_KEY,
                result.features?.isAppRedesigned ? 'new' : 'old',
            )

            return result
        } catch (e: any | unknown) {
            console.log(e)
            return rejectWithValue('server error')
        }
    },
)

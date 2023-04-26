import { createAsyncThunk } from '@reduxjs/toolkit'
import { User, userActions } from '@/entities/User'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstarage'
import { ThunkConfig } from '@/app/providers/StoreProvider'

interface LoginByUsernameProps {
    username: string
    password: string
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>(
    'login/loginByUsername',
    async (userData: LoginByUsernameProps, thunkAPI) => {
        const { dispatch, extra, rejectWithValue } = thunkAPI

        try {
            const { data } = await extra.api.post<User>('/login', userData)

            if (!data) {
                throw Error('server error')
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(data))
            dispatch(userActions.setAuthData(data))
            return data
        } catch (e: any | unknown) {
            return rejectWithValue(e.message)
        }
    },
)

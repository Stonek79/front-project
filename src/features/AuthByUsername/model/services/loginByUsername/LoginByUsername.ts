import { createAsyncThunk } from '@reduxjs/toolkit'
import { User, userActions } from '@/entities/User'
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
    'common/loginByUsername',
    async (userData: LoginByUsernameProps, thunkAPI) => {
        const { dispatch, extra, rejectWithValue } = thunkAPI

        try {
            const { data } = await extra.api.post<User>('/login', userData)

            if (!data) {
                throw Error('server error')
            }

            dispatch(userActions.setAuthData(data))

            return data
        } catch (e: any | unknown) {
            return rejectWithValue(e.message)
        }
    },
)

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { User, userActions } from 'entities/User'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstarage'

interface LoginByUsernameProps {
    username: string
    password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, { rejectValue: string }>(
    'login/loginByUsername',
    async (userData: LoginByUsernameProps, thunkAPI) => {
        try {
            const { data } = await axios.post<User>('http://localhost:8000/login', userData)

            if (!data) {
                throw Error('server error')
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(data))
            thunkAPI.dispatch(userActions.setAuthData(data))
            return data
        } catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue(e.message)
        }
    },
)

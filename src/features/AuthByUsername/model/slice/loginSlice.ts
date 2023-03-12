import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginSchema } from '../types/loginSchema'
import { loginByUsername } from '../services/loginByUsername/LoginByUsername'

const initialState: LoginSchema = {
    password: '',
    username: '',
    isLoading: false,
    error: '',
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state) => {
                state.error = ''
                state.isLoading = true
            })
            .addCase(loginByUsername.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice

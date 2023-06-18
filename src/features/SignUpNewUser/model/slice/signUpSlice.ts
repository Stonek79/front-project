import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SignUpSchema } from '../types/signUpSchema'
import { addNewUser } from '../services/AddNewUser'

const initialState: SignUpSchema = {
    password: '',
    confirmedPassword: '',
    username: '',
    isLoading: false,
    error: '',
}

export const SignUpSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setNewUsername: (state, { payload }: PayloadAction<string>) => {
            state.username = payload
            state.error = ''
        },
        setPassword: (state, { payload }: PayloadAction<string>) => {
            state.password = payload
            state.error = ''
        },
        setConfirmedPassword: (state, { payload }: PayloadAction<string>) => {
            state.confirmedPassword = payload
            state.error = ''
        },
        setError: (state, { payload }) => {
            state.error = payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewUser.pending, (state) => {
                state.error = ''
                state.isLoading = true
            })
            .addCase(addNewUser.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(addNewUser.rejected, (state, { payload }) => {
                state.isLoading = false
                state.error = payload
            })
    },
})

export const { actions: signUpActions } = SignUpSlice
export const { reducer: signUpReducer } = SignUpSlice

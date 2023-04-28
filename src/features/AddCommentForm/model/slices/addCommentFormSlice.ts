import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AddCommentFormSchema } from '../types/addCommentFormSchema'

const initialState: AddCommentFormSchema = {
    text: '',
    isLoading: false,
    error: '',
}

export const addCommentFormSlice = createSlice({
    name: 'commentForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //     .addCase(loginByUsername.pending, (state) => {
    //         state.error = ''
    //         state.isLoading = true
    //     })
    //     .addCase(loginByUsername.fulfilled, (state) => {
    //         state.isLoading = false
    //     })
    //     .addCase(loginByUsername.rejected, (state, action) => {
    //         state.isLoading = false
    //         state.error = action.payload
    //     })
    // },
})

export const { actions: commentFormActions } = addCommentFormSlice
export const { reducer: commentFormReducer } = addCommentFormSlice

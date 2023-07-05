import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Article } from '../types/article'
import { ArticleDetailsSchema } from '../types/articleDetailsSchema'
import { fetchArticleById } from '../../model/services/fetchArticleById'
import { editArticle } from '../services/editArticle'

const initialState: ArticleDetailsSchema = {
    form: undefined,
    data: undefined,
    error: undefined,
    isLoading: false,
}

export const articleDetailsSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        cancelEdit: (state) => {
            state.form = state.data
        },
        setNewArticleForm: (state, { payload }: PayloadAction<Article>) => {
            state.form = payload
            state.data = payload
        },
        updateArticle: (state, action: PayloadAction<Article>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(
                fetchArticleById.fulfilled,
                (state, action: PayloadAction<Article>) => {
                    state.isLoading = false
                    state.data = action.payload
                    state.form = action.payload
                },
            )
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
        builder
            .addCase(editArticle.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(
                editArticle.fulfilled,
                (state, action: PayloadAction<Article>) => {
                    state.isLoading = false
                    state.data = action.payload
                    state.form = action.payload
                },
            )
            .addCase(editArticle.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: articleDetailsActions } = articleDetailsSlice
export const { reducer: articleDetailsReducer } = articleDetailsSlice

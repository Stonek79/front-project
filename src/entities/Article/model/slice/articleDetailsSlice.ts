import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Article, ArticleBlock, ArticleTypesType } from '../types/article'
import { ArticleDetailsSchema } from '../types/articleDetailsSchema'
import { fetchArticleById } from '../services/fetchArticleById'

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
        updateArticleTitle: (state, action: PayloadAction<string>) => {
            if (state.form) {
                state.form.title = action.payload
            }
        },
        updateArticleSubtitle: (state, action: PayloadAction<string>) => {
            if (state.form) {
                state.form.subtitle = action.payload
            }
        },
        updateArticleImage: (state, action: PayloadAction<string>) => {
            if (state.form) {
                state.form.img = action.payload
            }
        },
        updateArticleType: (
            state,
            action: PayloadAction<ArticleTypesType[]>,
        ) => {
            if (state.form) {
                state.form.type = action.payload
            }
        },
        updateArticleBlocks: (state, action: PayloadAction<ArticleBlock[]>) => {
            if (state.form) {
                state.form.blocks = action.payload
            }
        },
        updateArticleBlock: (
            state,
            { payload }: PayloadAction<ArticleBlock>,
        ) => {
            if (state.form) {
                const index = state.form.blocks.findIndex(
                    (block) => block.id === payload.id,
                )
                state.form.blocks[index] = payload
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
    },
})

export const { actions: articleDetailsActions } = articleDetailsSlice
export const { reducer: articleDetailsReducer } = articleDetailsSlice

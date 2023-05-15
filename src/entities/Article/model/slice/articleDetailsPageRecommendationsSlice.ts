import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'
import { fetchArticlesRecommendations } from '../../model/services/fetchArticlesRecommendations'
import { Article } from '../types/article'
import { ArticleDetailsRecommendationsSchema } from '../types/articleDetailsRecommendationsSchema'

const recommendationsAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
})

export const getArticlesRecommendations =
    recommendationsAdapter.getSelectors<StateSchema>(
        (state) =>
            state.articlesRecommendations ||
            recommendationsAdapter.getInitialState(),
    )

const articleDetailsPageRecommendationsSlice = createSlice({
    name: 'comments',
    initialState:
        recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>(
            {
                isLoading: false,
                error: undefined,
                ids: [],
                entities: {},
            },
        ),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesRecommendations.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(
                fetchArticlesRecommendations.fulfilled,
                (state, action: PayloadAction<Article[]>) => {
                    state.isLoading = false
                    recommendationsAdapter.setAll(state, action.payload)
                },
            )
            .addCase(fetchArticlesRecommendations.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { reducer: articleDetailsPageRecommendationsSliceReducer } =
    articleDetailsPageRecommendationsSlice
export const { actions: articleDetailsPageRecommendationsSliceActions } =
    articleDetailsPageRecommendationsSlice

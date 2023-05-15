import { StateSchema } from '@/app/providers/StoreProvider'

export const getArticlesRecommendationsIsLoading = (state: StateSchema) =>
    state.articlesRecommendations?.isLoading
export const getArticlesRecommendationsError = (state: StateSchema) =>
    state.articlesRecommendations?.error

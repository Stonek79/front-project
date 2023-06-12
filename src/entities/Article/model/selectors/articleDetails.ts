import { StateSchema } from '@/app/providers/StoreProvider'

export const getArticleDetailsData = (state: StateSchema) => state.article?.data
export const getArticleDetailsFormData = (state: StateSchema) =>
    state.article?.form
export const getArticleIsLoadingData = (state: StateSchema) =>
    state.article?.isLoading || false
export const getArticleErrorData = (state: StateSchema) => state.article?.error

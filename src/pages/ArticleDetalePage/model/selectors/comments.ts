import { StateSchema } from '@/app/providers/StoreProvider'

export const getIsLoadingComments = (state: StateSchema) =>
    state.comments?.isLoading
export const getErrorComments = (state: StateSchema) => state.comments?.error

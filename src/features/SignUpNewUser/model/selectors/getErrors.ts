import { StateSchema } from '@/app/providers/StoreProvider'

export const getErrors = (state: StateSchema) => state?.signUpForm?.error

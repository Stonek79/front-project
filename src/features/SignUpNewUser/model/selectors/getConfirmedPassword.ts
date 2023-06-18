import { StateSchema } from '@/app/providers/StoreProvider'

export const getConfirmedPassword = (state: StateSchema) =>
    state?.signUpForm?.confirmedPassword

import { Profile, ValidateErrors } from '@/entities/Profile'

export interface ProfileSchema {
    data?: Profile
    form?: Profile
    isLoading: boolean
    error?: ValidateErrors
    readonly: boolean
    validateErrors?: ValidateErrors
}

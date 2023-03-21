import { Currency } from 'entities/Currency/model/types/currency'
import { Countries } from 'entities/Country/model/types/countries'

export enum ValidateProfileErrors {
    NO_DATA = 'NO_DATA',
    INCORRECT_LENGTH = 'INCORRECT_LENGTH',
    REQUIRED = 'REQUIRED',
    SERVER_ERROR = 'SERVER_ERROR',
    INCORRECT_AGE = 'INCORRECT_AGE'
}

export type ValidateErrors = {
    firstname: ValidateProfileErrors[],
    lastname: ValidateProfileErrors[],
    age: ValidateProfileErrors[],
    city: ValidateProfileErrors[],
    username: ValidateProfileErrors[],
    currency: ValidateProfileErrors[],
    country: ValidateProfileErrors[],
    data: ValidateProfileErrors[]
}

export interface Profile {
    id?: string,
    firstname?: string,
    lastname?: string,
    age?: number | string,
    currency?: Currency,
    country?: Countries,
    city?: string,
    username?: string,
    avatar?: string
}

export interface ProfileSchema {
    data?: Profile
    form?: Profile
    isLoading: boolean
    error?: ValidateErrors
    readonly: boolean
    validateErrors?: ValidateErrors
}

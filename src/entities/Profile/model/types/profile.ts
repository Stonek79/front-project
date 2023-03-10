import { Currency } from 'entities/Currency/model/types/currency'
import { Countries } from 'entities/Country/model/types/countries'

export interface Profile {
    firstname?: string,
    lastname?: string,
    age?: number,
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
    error?: string
    readonly: boolean
}

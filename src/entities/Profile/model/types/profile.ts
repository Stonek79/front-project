import { Currency } from 'entities/Currency/model/types/currency'
import { Countries } from 'entities/Country/model/types/countries'

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

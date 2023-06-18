import { Currency } from '@/entities/Currency'
import { Countries } from '@/entities/Country'

export const ValidateProfileErrors = {
    NO_DATA: 'NO_DATA',
    INCORRECT_LENGTH: 'INCORRECT_LENGTH',
    REQUIRED: 'REQUIRED',
    SERVER_ERROR: 'SERVER_ERROR',
    INCORRECT_AGE: 'INCORRECT_AGE',
} as const

export const newProfile = {
    id: '',
    firstname: '',
    lastname: '',
    age: 18,
    currency: Currency.USD,
    country: Countries.USA,
    city: '',
    username: '',
    avatar: '',
    userId: '',
}

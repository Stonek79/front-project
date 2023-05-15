import { Currency } from '@/entities/Currency'
import { Countries } from '@/entities/Country'
import { ValidateProfileErrors } from '@/entities/Profile'
import { ValidateProfileData } from '../ValidateProfileData'

jest.mock('axios')

const testData = {
    firstname: 'Alex',
    lastname: 'Smith',
    age: '42',
    currency: Currency.RUB,
    country: Countries.Russia,
    city: 'Moscow',
    username: 'StoneK',
}

const errors = {
    firstname: [],
    lastname: [],
    age: [],
    city: [],
    username: [],
    currency: [],
    country: [],
    data: [],
}

describe('Validate Profile Data test', () => {
    test('success validate data', async () => {
        const result = ValidateProfileData(testData)

        expect(result).toEqual(errors)
    })

    test('with errors REQUIRED, INCORRECT_AGE, INCORRECT_LENGTH', async () => {
        const withErrors = {
            ...testData,
            firstname: undefined,
            age: '234',
            username: 'X',
        }
        const result = ValidateProfileData(withErrors)

        expect(result).toHaveProperty('firstname', [
            ValidateProfileErrors.REQUIRED,
        ])
        expect(result).toHaveProperty('age', [
            ValidateProfileErrors.INCORRECT_AGE,
        ])
        expect(result).toHaveProperty('username', [
            ValidateProfileErrors.INCORRECT_LENGTH,
        ])
    })

    test('with all errors', async () => {
        const withErrors = {
            firstname: undefined,
            lastname: 'S',
            age: '422',
            currency: Currency.RUB,
            country: Countries.Russia,
            city: undefined,
            username: 'X',
        }

        const result = ValidateProfileData({
            ...withErrors,
            currency: undefined,
            country: undefined,
        })

        expect(result).toHaveProperty('firstname', [
            ValidateProfileErrors.REQUIRED,
        ])
        expect(result).toHaveProperty('lastname', [
            ValidateProfileErrors.INCORRECT_LENGTH,
        ])
        expect(result).toHaveProperty('age', [
            ValidateProfileErrors.INCORRECT_AGE,
        ])
        expect(result).toHaveProperty('username', [
            ValidateProfileErrors.INCORRECT_LENGTH,
        ])
        expect(result).toHaveProperty('currency', [
            ValidateProfileErrors.REQUIRED,
        ])
        expect(result).toHaveProperty('country', [
            ValidateProfileErrors.REQUIRED,
        ])
        expect(result).toHaveProperty('city', [ValidateProfileErrors.REQUIRED])
    })
})

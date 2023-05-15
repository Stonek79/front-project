import { StateSchema } from '@/app/providers/StoreProvider'
import { ValidateProfileErrors } from '@/entities/Profile'
import { getProfileValidateErrors } from './getProfileValidateErrors'

const errors = {
    firstname: [ValidateProfileErrors.REQUIRED],
    lastname: [ValidateProfileErrors.INCORRECT_LENGTH],
    age: [ValidateProfileErrors.INCORRECT_AGE],
    city: [ValidateProfileErrors.REQUIRED],
    username: [ValidateProfileErrors.INCORRECT_LENGTH],
    currency: [],
    country: [],
    data: [],
}

describe('get Profile ValidateErrors test', () => {
    test('should return errors', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors: errors,
            },
        }
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(errors)
    })

    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(
            undefined,
        )
    })
})

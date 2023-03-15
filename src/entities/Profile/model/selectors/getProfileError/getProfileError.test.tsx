import { StateSchema } from 'app/providers/StoreProvider'
import { getProfileError } from './getProfileError'
import { ValidateProfileErrors } from '../../types/profile'

describe('get Profile Error test', () => {
    test('should return Profile Error', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: {
                    firstname: [],
                    lastname: [],
                    age: [],
                    city: [],
                    username: [],
                    currency: [],
                    country: [],
                    data: [ValidateProfileErrors.NO_DATA],
                },
            },
        }
        expect(getProfileError(state as StateSchema)).toHaveProperty('data', [ValidateProfileErrors.NO_DATA])
    })

    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileError(state as StateSchema)).toEqual(undefined)
    })
})

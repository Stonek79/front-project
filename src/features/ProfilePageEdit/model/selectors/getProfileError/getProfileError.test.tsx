import { StateSchema } from '@/app/providers/StoreProvider'
import { ValidateProfileErrors } from '@/entities/Profile'
import { getProfileError } from './getProfileError'

describe('get Profile Error test', () => {
    test('should return Profile Error', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: '',
            },
        }
        expect(getProfileError(state as StateSchema)).toHaveProperty('data', [
            ValidateProfileErrors.NO_DATA,
        ])
    })

    test('should return undefined', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileError(state as StateSchema)).toEqual(undefined)
    })
})

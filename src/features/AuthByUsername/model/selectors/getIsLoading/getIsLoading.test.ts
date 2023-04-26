import { StateSchema } from '@/app/providers/StoreProvider'
import { getIsLoading } from './getIsLoading'

describe('getIsLoading test', () => {
    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                isLoading: true,
            },
        }
        expect(getIsLoading(state as StateSchema)).toBeTruthy()
    })
    test('with empty loading', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getIsLoading(state as StateSchema)).toBeFalsy()
    })
})

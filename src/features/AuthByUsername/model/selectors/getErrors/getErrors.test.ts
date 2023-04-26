import { StateSchema } from '@/app/providers/StoreProvider'
import { getErrors } from './getErrors'

describe('getErrors test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                error: 'error',
            },
        }
        expect(getErrors(state as StateSchema)).toEqual('error')
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getErrors(state as StateSchema)).toEqual(undefined)
    })
})

import { StateSchema } from '@/app/providers/StoreProvider'
import { getUsername } from './getUsername'

describe('getUsername test', () => {
    test('should return username', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'user',
            },
        }
        expect(getUsername(state as StateSchema)).toEqual('user')
    })

    test('should return empty string', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getUsername(state as StateSchema)).toEqual('')
    })
})

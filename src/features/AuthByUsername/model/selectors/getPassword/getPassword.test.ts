import { StateSchema } from '@/app/providers/StoreProvider'
import { getPassword } from './getPassword'

describe('getPassword test', () => {
    test('should return password', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                password: '666',
            },
        }
        expect(getPassword(state as StateSchema)).toEqual('666')
    })

    test('should return empty string', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getPassword(state as StateSchema)).toEqual('')
    })
})

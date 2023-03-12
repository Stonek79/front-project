import { StateSchema } from 'app/providers/StoreProvider'
import { getCounter } from './getCounter'

describe('getCounter', () => {
    test('should return value: 42', () => {
        const state: DeepPartial<StateSchema> = {
            counter: {
                value: 42,
            },
        }
        expect(getCounter(state as StateSchema)).toEqual({ value: 42 })
    })
})

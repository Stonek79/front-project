import { CounterSchema } from '../types/counterSchema'
import { counterActions, counterReducer } from './counterSlice'

describe('counterSlice test', () => {
    test('increment 42+1', () => {
        const state: CounterSchema = {
            value: 42,
        }
        expect(counterReducer(state, counterActions.increment())).toEqual({
            value: 43,
        })
    })

    test('decrement 42-1', () => {
        const state: CounterSchema = {
            value: 42,
        }
        expect(counterReducer(state, counterActions.decrement())).toEqual({
            value: 41,
        })
    })

    test('default state 0+1', () => {
        expect(counterReducer(undefined, counterActions.increment())).toEqual({
            value: 1,
        })
    })
})

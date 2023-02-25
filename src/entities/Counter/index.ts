import { Counter } from 'entities/Counter/ui/Counter'
import { counterReducer } from 'entities/Counter/model/slice/counterSlice'
import type { CounterSchema } from 'entities/Counter/model/types/counterSchema'

export {
    CounterSchema,
    counterReducer,
    Counter,
}

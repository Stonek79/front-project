import { AsyncThunkAction } from '@reduxjs/toolkit'
import axios, { AxiosStatic } from 'axios'
import { StateSchema } from '@/app/providers/StoreProvider'

type ActionCreatorType<Return, Arg, RejectedValue> = (
    arg: Arg,
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>

// As a class component

// export class TestAsyncThunk<Return, Arg, RejectedValue> {
//     dispatch: jest.MockedFn<any>
//
//     getState: () => StateSchema
//
//     actionCreator: ActionCreatorType<Return, Arg, RejectedValue>
//
//     constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
//         this.actionCreator = actionCreator
//         this.dispatch = jest.fn()
//         this.getState = jest.fn()
//     }
//
//     async callThunk(arg: Arg) {
//         const action = this.actionCreator(arg)
//         const result = await action(this.dispatch, this.getState, undefined)
//
//         return result
//     }
// }

// As a function component

jest.mock('axios')

const mockedAxios = jest.mocked(axios, true)

export function TestAsyncThunk<Return, Arg, RejectedValue>(
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
    state?: DeepPartial<StateSchema>,
) {
    const dispatch: jest.MockedFn<any> = jest.fn()
    const getState: () => StateSchema = jest.fn(() => state as StateSchema)

    const navigate: jest.MockedFn<any> = jest.fn()
    const api: jest.MockedFunctionDeep<AxiosStatic> = mockedAxios

    const callThunk = async (arg: Arg) => {
        const action = actionCreator(arg)
        const result = await action(dispatch, getState, { api, navigate })

        return result
    }
    return {
        actionCreator,
        callThunk,
        dispatch,
        getState,
        api,
        navigate,
    }
}

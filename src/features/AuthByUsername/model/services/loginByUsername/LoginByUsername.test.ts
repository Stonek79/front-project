import axios from 'axios'
import { userActions } from 'entities/User'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { loginByUsername } from './LoginByUsername'

jest.mock('axios')

const mockedAxios = jest.mocked(axios, true)

describe('LoginByUsername.test', () => {
    // tests without TestAsyncThunk:

    // let dispatch: Dispatch
    // let getState: () => StateSchema
    //
    // beforeEach(() => {
    //     dispatch = jest.fn()
    //     getState = jest.fn()
    // })

    // test('success login test', async () => {
    //     const testData = { username: 'user', id: '123' }
    //
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ data: testData }))
    //     const action = loginByUsername({ username: 'user', password: '123pass' })
    //     const result = await action(dispatch, getState, undefined)
    //
    //     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(testData))
    //     expect(dispatch).toHaveBeenCalledTimes(3)
    //     expect(mockedAxios.post).toHaveBeenCalled()
    //     expect(result.meta.requestStatus).toBe('fulfilled')
    //     expect(result.payload).toBe(testData)
    // })
    //
    // test('error login test', async () => {
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))
    //     const action = loginByUsername({ username: 'user', password: '123pass' })
    //     const result = await action(dispatch, getState, undefined)
    //
    //     expect(dispatch).toHaveBeenCalledTimes(2)
    //     expect(mockedAxios.post).toHaveBeenCalled()
    //     expect(result.meta.requestStatus).toBe('rejected')
    //     expect(result.payload).toBe('server error')
    // })

    // tests with TestAsyncThunk:

    test('success login test', async () => {
        const testData = { username: 'user', id: '123' }
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: testData }))

        const thunk = TestAsyncThunk(loginByUsername)
        const result = await thunk.callThunk({ username: 'user', password: '123pass' })

        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(testData))
        expect(thunk.dispatch).toHaveBeenCalledTimes(3)
        expect(mockedAxios.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toBe(testData)
    })

    test('error login test', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))
        const thunk = TestAsyncThunk(loginByUsername)
        const result = await thunk.callThunk({ username: 'user', password: '123pass' })

        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(mockedAxios.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toBe('server error')
    })
})

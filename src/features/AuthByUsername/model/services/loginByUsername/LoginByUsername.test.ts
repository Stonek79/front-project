import { userActions } from '@/entities/User'
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { loginByUsername } from './LoginByUsername'

jest.mock('axios')

describe('LoginByUsername.test', () => {
    // tests without TestAsyncThunk:

    // let dispatch: Dispatch
    // let getState: () => StateSchema
    //
    // beforeEach(() => {
    //     dispatch = jest.fn()
    //     getState = jest.fn()
    // })

    // test('success common test', async () => {
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
    // test('error common test', async () => {
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

    test('success common test', async () => {
        const testData = { username: 'user', id: '123' }

        const thunk = TestAsyncThunk(loginByUsername)
        thunk.api.post.mockReturnValue(Promise.resolve({ data: testData }))

        const result = await thunk.callThunk({
            username: 'user',
            password: '123pass',
        })

        expect(thunk.dispatch).toHaveBeenCalledWith(
            userActions.setAuthData(testData),
        )
        expect(thunk.dispatch).toHaveBeenCalledTimes(3)
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toBe(testData)
    })

    test('error common test', async () => {
        const thunk = TestAsyncThunk(loginByUsername)
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))

        const result = await thunk.callThunk({
            username: 'user',
            password: '123pass',
        })

        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toBe('server error')
    })
})

import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { Currency } from '@/entities/Currency'
import { Countries } from '@/entities/Country'
import { ValidateProfileErrors } from '@/entities/Profile';
import { updateProfileData } from '../UpdateProfileData'

jest.mock('axios')

const testData = {
    firstname: 'Alex',
    lastname: 'Smith',
    age: '42',
    currency: Currency.RUB,
    country: Countries.Russia,
    city: 'Moscow',
    username: 'StoneK',
}

describe('UpdateProfileData test', () => {
    test('success get data test', async () => {
        const thunk = TestAsyncThunk(updateProfileData, {
            profile: {
                form: testData,
            },
        })
        thunk.api.put.mockReturnValue(Promise.resolve({ data: testData }))

        const result = await thunk.callThunk()

        expect(thunk.api.put).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toBe(testData)
    })

    test('rejected with error NO_DATA', async () => {
        const thunk = TestAsyncThunk(updateProfileData, {
            profile: {
                form: testData,
            },
        })
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }))

        const result = await thunk.callThunk()

        expect(thunk.api.put).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toHaveProperty('data', [ValidateProfileErrors.NO_DATA])
    })

    test('rejected with error REQUIRED', async () => {
        const thunk = TestAsyncThunk(updateProfileData, {
            profile: {
                form: { ...testData, username: undefined },
            },
        })
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }))

        const result = await thunk.callThunk()

        expect(thunk.api.put).not.toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toHaveProperty('username', [ValidateProfileErrors.REQUIRED])
    })
})

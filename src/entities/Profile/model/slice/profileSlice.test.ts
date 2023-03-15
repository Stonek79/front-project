import { DeepPartial } from '@reduxjs/toolkit'
import { Currency } from 'entities/Currency'
import { Countries } from 'entities/Country'
import { updateProfileData } from 'entities/Profile'
import { ProfileSchema, ValidateProfileErrors } from '../types/profile'
import { profileActions, profileReducer } from './profileSlice'

const testData = {
    firstname: 'Alex',
    lastname: 'Smith',
    age: '42',
    currency: Currency.RUB,
    country: Countries.Russia,
    city: 'Moscow',
    username: 'StoneK',
}

describe('profileSlice test', () => {
    test('set readonly', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: true,
        }
        expect(profileReducer(state as ProfileSchema, profileActions.setReadonly(true))).toEqual({ readonly: true })
    })

    test('cancel update profile data', () => {
        const state: DeepPartial<ProfileSchema> = {
            readonly: true, validateErrors: undefined, data: testData, form: { firstname: 'name' },
        }
        expect(profileReducer(state as ProfileSchema, profileActions.cancelEdit()))
            .toEqual({
                readonly: true, validateErrors: undefined, data: testData, form: testData,
            })
    })

    test('update profile data', () => {
        const state: DeepPartial<ProfileSchema> = {
            form: { firstname: 'name' },
        }
        expect(profileReducer(state as ProfileSchema, profileActions
            .updateProfile({ firstname: 'name' })))
            .toEqual({
                form: { firstname: 'name' },
            })
    })

    test('update profile data pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false,
            validateErrors: {
                firstname: [],
                lastname: [],
                age: [],
                city: [],
                username: [],
                currency: [],
                country: [],
                data: [ValidateProfileErrors.NO_DATA],
            },
        }
        expect(profileReducer(state as ProfileSchema, updateProfileData.pending))
            .toEqual({
                isLoading: true,
                validateErrors: undefined,
            })
    })

    test('update profile data fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
            readonly: false,
            validateErrors: {
                firstname: [],
                lastname: [],
                age: [],
                city: [],
                username: [],
                currency: [],
                country: [],
                data: [ValidateProfileErrors.NO_DATA],
            },
        }
        expect(profileReducer(state as ProfileSchema, updateProfileData.fulfilled(testData, '')))
            .toEqual({
                isLoading: false,
                readonly: true,
                data: testData,
                form: testData,
                validateErrors: undefined,
            })
    })
})

import { DeepPartial } from '@reduxjs/toolkit'
import { LoginSchema } from '../types/loginSchema'
import { loginActions, loginReducer } from './loginSlice'

describe('loginSlice test', () => {
    test('set username', () => {
        const state: DeepPartial<LoginSchema> = {
            username: 'user',
        }
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setUsername('user123'),
            ),
        ).toEqual({ username: 'user123' })
    })

    test('set password', () => {
        const state: DeepPartial<LoginSchema> = {
            password: '123pass',
        }
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setPassword('1pass'),
            ),
        ).toEqual({ password: '1pass' })
    })
})

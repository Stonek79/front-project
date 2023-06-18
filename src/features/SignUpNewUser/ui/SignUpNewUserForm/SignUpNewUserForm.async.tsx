import { FC, lazy } from 'react'
import { SignUpNewUserFormProps } from './SignUpNewUserForm'

export const SignUpNewUserFormAsync = lazy<FC<SignUpNewUserFormProps>>(
    () => import('./SignUpNewUserForm'),
)

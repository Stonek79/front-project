import { FC, lazy } from 'react'
import { ConfirmationModalFormProps } from './ConfirmationModalForm'

export const LoginFormAsync = lazy<FC<ConfirmationModalFormProps>>(
    () => import('./ConfirmationModalForm'),
)

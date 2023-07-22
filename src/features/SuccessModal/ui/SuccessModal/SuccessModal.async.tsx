import { FC, lazy } from 'react'
import { SuccessModalProps } from './SuccessModal'

export const SuccessModalAsync = lazy<FC<SuccessModalProps>>(
    () => import('./SuccessModal'),
)

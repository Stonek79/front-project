import { FC, lazy } from 'react'
import { BigSertificateModalProps } from './BigSertificateModal'

export const BigSertificateModalAsync = lazy<FC<BigSertificateModalProps>>(
    () => import('./BigSertificateModal'),
)

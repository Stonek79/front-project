import { FC, lazy } from 'react'
import { BigCertificateModalProps } from './BigCertificateModal'

export const BigCertificateModalAsync = lazy<FC<BigCertificateModalProps>>(
    () => import('./BigCertificateModal'),
)

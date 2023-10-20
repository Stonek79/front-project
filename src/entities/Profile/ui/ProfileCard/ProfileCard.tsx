import { memo } from 'react'
import { ProfileCardRedesigned } from '../ProfileCardRedesigned/ProfileCardRedesigned'
import { Profile, ValidateErrors } from '../..'
import { Currency } from '@/entities/Currency'
import { Countries } from '@/entities/Country'

export interface ProfileCardProps {
    className?: string
    data?: Profile
    error?: string
    isLoading?: boolean
    readonly?: boolean
    validateErrors?: ValidateErrors
    onChangeLastname?: (value?: string) => void
    onChangeFirstname?: (value?: string) => void
    onChangeAge?: (value?: string) => void
    onChangeCity?: (value?: string) => void
    onChangeUsername?: (value?: string) => void
    onChangeAvatar?: (value?: string) => void
    onChangeCurrency?: (value?: Currency) => void
    onChangeCountry?: (value?: Countries) => void
}

export const ProfileCard = memo((props: ProfileCardProps) => {
    const { className, ...otherProps } = props

    return <ProfileCardRedesigned className={className} {...otherProps} />
})

import { memo } from 'react'
import { ToggleComponentFeatures } from '@/shared/lib/features'
import { ProfileCardRedesigned } from '../ProfileCardRedesigned/ProfileCardRedesigned'
import { ProfileCardDeprecated } from '../ProfileCardDeprecated/ProfileCardDeprecated'
import { Profile, ValidateErrors } from '../..'
import { Currency } from '@/entities/Currency'
import { Countries } from '@/entities/Country'

export interface ProfileCardProps {
    className?: string
    data?: Profile
    error?: ValidateErrors
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

    return (
        <ToggleComponentFeatures
            feature="isAppRedesigned"
            on={<ProfileCardRedesigned className={className} {...otherProps} />}
            off={
                <ProfileCardDeprecated className={className} {...otherProps} />
            }
        />
    )
})

import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text'
import { Input } from 'shared/ui/Input/Input'
import { Loader } from 'shared/ui/Loader/Loader'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Currency, CurrencySelect } from 'entities/Currency'
import { Countries } from 'entities/Country/model/types/countries'
import { CountrySelect } from 'entities/Country'
import { Profile } from '../../model/types/profile'
import cls from './ProfileCard.module.scss'

interface ProfileCardProps {
    className?: string;
    data?: Profile
    error?: string
    isLoading?: boolean
    readonly?: boolean
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
    const {
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
        className,
        data,
        error,
        isLoading,
        readonly,
    } = props
    const { t } = useTranslation()

    const mode: Mods = {
        [cls.editing]: !readonly,
    }
    const cn = classNames(cls.ProfileCard, mode, [className])
    const cnLoading = classNames(cls.ProfileCard, {}, [className, cls.loading])
    const cnError = classNames(cls.ProfileCard, {}, [className, cls.error])

    if (isLoading) {
        return (
            <div className={cnLoading}>
                <Loader />
            </div>
        )
    }

    if (error) {
        return (
            <div className={cnError}>
                <Text
                    theme={TextTheme.ERROR}
                    title={error}
                    align={TextAlign.CENTER}
                />
            </div>
        )
    }

    return (
        <div className={cn}>
            <div className={cls.data}>
                {data?.avatar && (
                    <div className={cls.avatarWrapper}>
                        <Avatar
                            src={data.avatar}
                            alt={t('Avatar')}
                        />
                    </div>
                )}
                <Input
                    value={data?.firstname}
                    placeholder={t('First name')}
                    className={cls.input}
                    onChange={onChangeFirstname}
                    readonly={readonly}
                />
                <Input
                    value={data?.lastname}
                    placeholder={t('Last name')}
                    className={cls.input}
                    onChange={onChangeLastname}
                    readonly={readonly}
                />
                <Input
                    value={data?.age}
                    placeholder={t('Age')}
                    className={cls.input}
                    onChange={onChangeAge}
                    readonly={readonly}
                />
                <Input
                    value={data?.city}
                    placeholder={t('City')}
                    className={cls.input}
                    onChange={onChangeCity}
                    readonly={readonly}
                />
                <Input
                    value={data?.username}
                    placeholder={t('Username')}
                    className={cls.input}
                    onChange={onChangeUsername}
                    readonly={readonly}
                />
                <Input
                    value={data?.avatar}
                    placeholder={t('Avatar')}
                    className={cls.input}
                    onChange={onChangeAvatar}
                    readonly={readonly}
                />
                <CurrencySelect
                    value={data?.currency}
                    onChange={onChangeCurrency}
                    readonly={readonly}
                    className={cls.input}
                />
                <CountrySelect
                    value={data?.country}
                    onChange={onChangeCountry}
                    readonly={readonly}
                    className={cls.input}
                />
            </div>
        </div>
    );
});

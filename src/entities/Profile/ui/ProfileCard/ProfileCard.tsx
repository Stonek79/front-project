import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { Input } from 'shared/ui/Input/Input'
import { Loader } from 'shared/ui/Loader/Loader'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Currency, CurrencySelect } from 'entities/Currency'
import { Countries } from 'entities/Country/model/types/countries'
import { CountrySelect } from 'entities/Country'
import { Profile, ValidateErrors, ValidateProfileErrors } from '../../model/types/profile'
import cls from './ProfileCard.module.scss'

interface ProfileCardProps {
    className?: string;
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
        validateErrors,
    } = props
    const { t } = useTranslation()

    const validateErrorTranslates = {
        [ValidateProfileErrors.NO_DATA]: t('noData'),
        [ValidateProfileErrors.REQUIRED]: t('required'),
        [ValidateProfileErrors.INCORRECT_LENGTH]: t('incorrectLength'),
        [ValidateProfileErrors.INCORRECT_AGE]: t('incorrectAge'),
        [ValidateProfileErrors.SERVER_ERROR]: t('serverError'),
    }
    const mode: Mods = {
        [cls.editing]: !readonly,
    }
    const cn = classNames(cls.ProfileCard, mode, [className])
    const cnLoading = classNames(cls.ProfileCard, {}, [className, cls.loading])
    const cnError = classNames(cls.ProfileCard, {}, [className, cls.error])

    const getErrorsFields = (errors: ValidateProfileErrors[]) => errors.map((err) => (
        <Text
            key={err}
            theme={TextTheme.ERROR}
            text={validateErrorTranslates[err]}
        />
    ))

    if (isLoading) {
        return (
            <div className={cnLoading}>
                <Loader />
            </div>
        )
    }

    if (error?.data.length) {
        return (
            <div className={cnError}>
                {getErrorsFields(error?.data)}
            </div>
        )
    }

    if (validateErrors?.data.length) {
        return (
            <div className={cnError}>
                {getErrorsFields(validateErrors?.data)}
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
                {validateErrors?.firstname.length ? getErrorsFields(validateErrors?.firstname) : null}
                <Input
                    value={data?.lastname}
                    placeholder={t('Last name')}
                    className={cls.input}
                    onChange={onChangeLastname}
                    readonly={readonly}
                />
                {validateErrors?.lastname.length ? getErrorsFields(validateErrors?.lastname) : null}
                <Input
                    value={data?.age}
                    placeholder={t('Age')}
                    className={cls.input}
                    onChange={onChangeAge}
                    readonly={readonly}
                />
                {validateErrors?.age.length ? getErrorsFields(validateErrors?.age) : null}
                <Input
                    value={data?.city}
                    placeholder={t('City')}
                    className={cls.input}
                    onChange={onChangeCity}
                    readonly={readonly}
                />
                {validateErrors?.city.length ? getErrorsFields(validateErrors?.city) : null}
                <Input
                    value={data?.username}
                    placeholder={t('Username')}
                    className={cls.input}
                    onChange={onChangeUsername}
                    readonly={readonly}
                />
                {validateErrors?.username.length ? getErrorsFields(validateErrors?.username) : null}
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
                {validateErrors?.currency.length ? getErrorsFields(validateErrors?.currency) : null}
                <CountrySelect
                    value={data?.country}
                    onChange={onChangeCountry}
                    readonly={readonly}
                    className={cls.input}
                />
                {validateErrors?.country.length ? getErrorsFields(validateErrors?.country) : null}
            </div>
        </div>
    );
});

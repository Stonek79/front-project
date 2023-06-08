import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TextTheme } from '@/shared/ui/deprecated/Text'
import { Input } from '@/shared/ui/deprecated/Input'
import { Loader } from '@/shared/ui/deprecated/Loader'
import { Avatar } from '@/shared/ui/deprecated/Avatar'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { CurrencySelect } from '@/entities/Currency'
import { CountrySelect } from '@/entities/Country'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { ValidateProfileErrors } from '../../model/consts/consts'
import { ValidateProfileErrorsType } from '../../model/types/profile'
import cls from './ProfileCardDeprecated.module.scss'
import { ProfileCardProps } from '../ProfileCard/ProfileCard'

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
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

    const getErrorsFields = (
        errors: ValidateProfileErrorsType[],
        field?: string,
    ) =>
        errors.map((err) => (
            <Text
                key={err}
                theme={TextTheme.ERROR}
                text={validateErrorTranslates[err]}
                data-testid={`ProfileCardDeprecated-${field}-field-error`}
            />
        ))

    if (isLoading) {
        return (
            <HStack max justify="center" className={cnLoading}>
                <Loader />
            </HStack>
        )
    }

    if (error?.data.length) {
        return (
            <HStack max justify="center" className={cnError}>
                {getErrorsFields(error?.data, 'data')}
            </HStack>
        )
    }

    if (validateErrors?.data.length) {
        return (
            <HStack max justify="center" className={cnError}>
                {getErrorsFields(validateErrors?.data, 'data')}
            </HStack>
        )
    }

    return (
        <VStack max gap="8" className={cn}>
            {data?.avatar && (
                <HStack max justify="center">
                    <Avatar src={data.avatar} alt={t('Avatar')} />
                </HStack>
            )}
            <Input
                value={data?.firstname}
                placeholder={t('First name')}
                className={cls.input}
                onChange={onChangeFirstname}
                readonly={readonly}
                data-testid="ProfileCardDeprecated-firstname-field-input"
            />
            {validateErrors?.firstname.length
                ? getErrorsFields(validateErrors?.firstname, 'firstname')
                : null}
            <Input
                value={data?.lastname}
                placeholder={t('Last name')}
                className={cls.input}
                onChange={onChangeLastname}
                readonly={readonly}
                data-testid="ProfileCardDeprecated-lastname-field-input"
            />
            {validateErrors?.lastname.length
                ? getErrorsFields(validateErrors?.lastname, 'lastname')
                : null}
            <Input
                value={data?.age}
                placeholder={t('Age')}
                className={cls.input}
                onChange={onChangeAge}
                readonly={readonly}
                data-testid="ProfileCardDeprecated-age-field-input"
            />
            {validateErrors?.age.length
                ? getErrorsFields(validateErrors?.age, 'age')
                : null}
            <Input
                value={data?.city}
                placeholder={t('City')}
                className={cls.input}
                onChange={onChangeCity}
                readonly={readonly}
                data-testid="ProfileCardDeprecated-city-field-input"
            />
            {validateErrors?.city.length
                ? getErrorsFields(validateErrors?.city, 'city')
                : null}
            <Input
                value={data?.username}
                placeholder={t('Username')}
                className={cls.input}
                onChange={onChangeUsername}
                readonly={readonly}
                data-testid="ProfileCardDeprecated-username-field-input"
            />
            {validateErrors?.username.length
                ? getErrorsFields(validateErrors?.username, 'username')
                : null}
            <Input
                value={data?.avatar}
                placeholder={t('Avatar')}
                className={cls.input}
                onChange={onChangeAvatar}
                readonly={readonly}
                data-testid="ProfileCardDeprecated-avatar-field-input"
            />
            <CurrencySelect
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
                className={cls.input}
                data-testid="ProfileCardDeprecated-currency-field-input"
            />
            {validateErrors?.currency.length
                ? getErrorsFields(validateErrors?.currency, 'currency')
                : null}
            <CountrySelect
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
                className={cls.input}
                data-testid="ProfileCardDeprecated-country-field-input"
            />
            {validateErrors?.country.length
                ? getErrorsFields(validateErrors?.country, 'country')
                : null}
        </VStack>
    )
})
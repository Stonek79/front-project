import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/redesigned/Text'
import { Input } from '@/shared/ui/redesigned/Input'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { CurrencySelect } from '@/entities/Currency'
import { CountrySelect } from '@/entities/Country'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ValidateProfileErrors } from '../../model/consts/consts'
import { ValidateProfileErrorsType } from '../../model/types/profile'
import cls from './ProfileCardRedesigned.module.scss'
import { Card } from '@/shared/ui/redesigned/Card'
import { ProfileCardProps } from '../ProfileCard/ProfileCard'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'

const ProfileCardSkeleton = () => (
    <Card gap="8" max cardPaddings="24">
        <VStack gap="32" max>
            <HStack max justify="center">
                <Skeleton width={128} border="100%" height={128} />
            </HStack>
            <HStack max gap="32">
                <VStack gap="16" max>
                    <Skeleton border="32px" width="100%" height={38} />
                    <Skeleton border="32px" width="100%" height={38} />
                    <Skeleton border="32px" width="100%" height={38} />
                    <Skeleton border="32px" width="100%" height={38} />
                </VStack>
                <VStack gap="16" max>
                    <Skeleton border="32px" width="100%" height={38} />
                    <Skeleton border="32px" width="100%" height={38} />
                    <Skeleton border="32px" width="100%" height={38} />
                    <Skeleton border="32px" width="100%" height={38} />
                </VStack>
            </HStack>
        </VStack>
    </Card>
)

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
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

    console.log(data, error, validateErrors)
    const validateErrorTranslates = {
        [ValidateProfileErrors.NO_DATA]: t('noData'),
        [ValidateProfileErrors.REQUIRED]: t('required'),
        [ValidateProfileErrors.INCORRECT_LENGTH]: t('incorrectLength'),
        [ValidateProfileErrors.INCORRECT_AGE]: t('incorrectAge'),
        [ValidateProfileErrors.SERVER_ERROR]: t('serverError'),
    }

    const cn = classNames('', {}, [className])
    const cnError = classNames('', {}, [className, cls.error])

    const getErrorsFields = (
        errors: ValidateProfileErrorsType[],
        field?: string,
    ) =>
        errors.map((err) => (
            <Text
                key={err}
                variant="error"
                text={validateErrorTranslates[err]}
                data-testid={`ProfileCardRedesigned-${field}-field-error`}
            />
        ))

    if (isLoading) {
        return (
            <HStack max justify="center">
                <ProfileCardSkeleton />
            </HStack>
        )
    }

    if (error) {
        return (
            <HStack max justify="center" className={cnError}>
                <Text text={error} />
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
        <Card gap="8" max cardPaddings="8" className={cn}>
            {data?.avatar && (
                <HStack max justify="center">
                    <Avatar size={128} src={data.avatar} alt={t('Avatar')} />
                </HStack>
            )}
            <HStack align="start" gap="24" max>
                <VStack gap="16" max>
                    <Input
                        value={data?.firstname}
                        label={`${t('First name')}:`}
                        className={cls.input}
                        onChange={onChangeFirstname}
                        readonly={readonly}
                        data-testid="ProfileCardRedesigned-firstname-field-input"
                    />
                    {validateErrors?.firstname.length
                        ? getErrorsFields(
                              validateErrors?.firstname,
                              'firstname',
                          )
                        : null}
                    <Input
                        value={data?.lastname}
                        label={`${t('Last name')}:`}
                        className={cls.input}
                        onChange={onChangeLastname}
                        readonly={readonly}
                        data-testid="ProfileCardRedesigned-lastname-field-input"
                    />
                    {validateErrors?.lastname.length
                        ? getErrorsFields(validateErrors?.lastname, 'lastname')
                        : null}
                    <Input
                        value={data?.age}
                        label={`${t('Age')}:`}
                        className={cls.input}
                        onChange={onChangeAge}
                        readonly={readonly}
                        data-testid="ProfileCardRedesigned-age-field-input"
                    />
                    {validateErrors?.age.length
                        ? getErrorsFields(validateErrors?.age, 'age')
                        : null}
                    <Input
                        value={data?.city}
                        label={`${t('City')}:`}
                        className={cls.input}
                        onChange={onChangeCity}
                        readonly={readonly}
                        data-testid="ProfileCardRedesigned-city-field-input"
                    />
                    {validateErrors?.city.length
                        ? getErrorsFields(validateErrors?.city, 'city')
                        : null}
                </VStack>
                <VStack gap="16" max>
                    <Input
                        value={data?.username}
                        label={`${t('Username')}:`}
                        className={cls.input}
                        onChange={onChangeUsername}
                        readonly={readonly}
                        data-testid="ProfileCardRedesigned-username-field-input"
                    />
                    {validateErrors?.username.length
                        ? getErrorsFields(validateErrors?.username, 'username')
                        : null}
                    <Input
                        value={data?.avatar}
                        label={`${t('Avatar')}:`}
                        className={cls.input}
                        onChange={onChangeAvatar}
                        readonly={readonly}
                        data-testid="ProfileCardRedesigned-avatar-field-input"
                    />
                    <CurrencySelect
                        value={data?.currency}
                        onChange={onChangeCurrency}
                        readonly={readonly}
                        className={cls.input}
                        data-testid="ProfileCardRedesigned-currency-field-input"
                    />
                    {validateErrors?.currency.length
                        ? getErrorsFields(validateErrors?.currency, 'currency')
                        : null}
                    <CountrySelect
                        value={data?.country}
                        onChange={onChangeCountry}
                        readonly={readonly}
                        className={cls.input}
                        data-testid="ProfileCardRedesigned-country-field-input"
                    />
                    {validateErrors?.country.length
                        ? getErrorsFields(validateErrors?.country, 'country')
                        : null}
                </VStack>
            </HStack>
        </Card>
    )
})

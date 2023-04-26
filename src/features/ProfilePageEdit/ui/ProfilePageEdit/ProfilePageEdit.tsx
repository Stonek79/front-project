import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Currency } from '@/entities/Currency'
import { Countries } from '@/entities/Country'
import { ProfileCard } from '@/entities/Profile'
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { VStack } from '@/shared/ui/Stack'
import { ProfilePageEditHeader } from '../../ui/ProfilePageEditHeader/ProfilePageEditHeader'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm'
import {
    getProfileValidateErrors,
} from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors'
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading'
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError'
import { fetchProfileData } from '../../model/services/FetchProfileData'
import { profileActions, profileReducer } from '../../model/slice/profileSlice'

interface ProfilePageEditProps {
    className?: string
    id?: string
}

const reducers: ReducersList = {
    profile: profileReducer,
}
export const ProfilePageEdit = memo((props: ProfilePageEditProps) => {
    const { className, id } = props

    const dispatch = useAppDispatch()
    const readonly = useSelector(getProfileReadonly)
    const profileData = useSelector(getProfileForm)
    const profileError = useSelector(getProfileError)
    const profileIsLoading = useSelector(getProfileIsLoading)
    const profileErrors = useSelector(getProfileValidateErrors)

    const cn = classNames('', {}, [className])

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id))
        }
    })

    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            firstname: value || '',
        }))
    }, [dispatch])

    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            lastname: value || '',
        }))
    }, [dispatch])

    const onChangeAge = useCallback((value?: string) => {
        const valueHandler = value?.replace(/\D+/gm, '')
        dispatch(profileActions.updateProfile({
            age: Number(valueHandler) || '',
        }))
    }, [dispatch])

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            city: value || '',
        }))
    }, [dispatch])

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            username: value || '',
        }))
    }, [dispatch])

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({
            avatar: value || '',
        }))
    }, [dispatch])

    const onChangeCurrency = useCallback((value?: Currency) => {
        dispatch(profileActions.updateProfile({
            currency: value,
        }))
    }, [dispatch])

    const onChangeCountry = useCallback((value?: Countries) => {
        dispatch(profileActions.updateProfile({
            country: value,
        }))
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack gap="16" max className={cn}>
                <ProfilePageEditHeader />
                <ProfileCard
                    data={profileData}
                    error={profileError}
                    isLoading={profileIsLoading}
                    readonly={readonly}
                    validateErrors={profileErrors}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />
            </VStack>
        </DynamicModuleLoader>
    )
})

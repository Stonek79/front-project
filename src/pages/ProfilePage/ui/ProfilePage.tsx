import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
    fetchProfileData,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
    getProfileValidateErrors,
    profileActions,
    ProfileCard,
    profileReducer,
} from 'entities/Profile'
import { useCallback, useEffect } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { Currency } from 'entities/Currency/model/types/currency'
import { Countries } from 'entities/Country/model/types/countries'
import { ProfilePageHeader } from '../ui/ProfilePageHeader/ProfilePageHeader'

const reducers: ReducersList = {
    profile: profileReducer,
}

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props
    const dispatch = useAppDispatch()
    const readonly = useSelector(getProfileReadonly)
    const profileData = useSelector(getProfileForm)
    const profileError = useSelector(getProfileError)
    const profileIsLoading = useSelector(getProfileIsLoading)
    const profileErrors = useSelector(getProfileValidateErrors)

    const cn = classNames('', {}, [className])

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchProfileData())
        }
    }, [dispatch])

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
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={cn}>
                <ProfilePageHeader />
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
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage
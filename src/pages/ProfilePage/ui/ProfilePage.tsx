import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ProfileCard, profileReducer } from 'entities/Profile'
import { useEffect } from 'react'
import { fetchProfileData } from 'entities/Profile/model/sevices/FetchPrifileData'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

const reducers: ReducersList = {
    profile: profileReducer,
}

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const cn = classNames('', {}, [className])

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={cn}>
                {t('ProfilePage')}
                <ProfileCard />
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage

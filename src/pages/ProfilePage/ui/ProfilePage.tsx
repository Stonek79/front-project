import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { profileReducer } from 'entities/Profile'

const reducers: ReducersList = {
    profile: profileReducer,
}

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props
    const { t } = useTranslation()

    const cn = classNames('', {}, [className])

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={cn}>
                {t('ProfilePage')}
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage

import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { useSelector } from 'react-redux'
import { getProfileData, getProfileError, getProfileIsLoading } from 'entities/Profile'
import { Text } from 'shared/ui/Text/Text'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import cls from './ProfileCard.module.scss'

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = memo((props: ProfileCardProps) => {
    const { className } = props
    const { t } = useTranslation()
    const profileData = useSelector(getProfileData)
    const profileError = useSelector(getProfileError)
    const profileIsLoading = useSelector(getProfileIsLoading)

    const cn = classNames(cls.ProfileCard, {}, [className])

    return (
        <div className={cn}>
            <div className={cls.header}>
                <Text title={t('Profile')} />
                <Button className={cls.btnEdit} theme={ButtonTheme.OUTLINE}>
                    {t('Edit profile')}
                </Button>
            </div>
            <div className={cls.data}>
                <Input
                    value={profileData?.firstname}
                    placeholder={t('First name')}
                    className={cls.input}
                />
                <Input
                    value={profileData?.lastname}
                    placeholder={t('Last name')}
                    className={cls.input}
                />
            </div>
        </div>
    );
});

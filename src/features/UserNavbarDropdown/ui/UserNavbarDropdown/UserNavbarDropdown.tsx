import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames'
import { Avatar } from '@/shared/ui/Avatar';
import { Dropdown } from '@/shared/ui/Popups';
import { isUserAdmin, isUserManager, User } from '@/entities/User';
import cls from './UserNavbarDropdown.module.scss'
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';

interface UserNavbarDropdownProps {
    className?: string
    authData: User
    onLogOut: () => void
}

export const UserNavbarDropdown = memo((props: UserNavbarDropdownProps) => {
    const { className, onLogOut, authData } = props
    const { t } = useTranslation()
    const isAdmin = useSelector(isUserAdmin)
    const isManager = useSelector(isUserManager)
    const cn = classNames('', {}, [className])

    const isAdminPanelAvailable = isAdmin || isManager

    const adminPanel = isAdminPanelAvailable ? [{
        content: t('Admin'),
        href: getRouteAdminPanel(),
    }] : []

    if (!authData) {
        return null
    }

    return (
        <Dropdown
            className={cn}
            direction="top right"
            items={[
                ...adminPanel,
                {

                    content: t('Profile'),
                    href: getRouteProfile(authData.id),
                },
                {
                    content: t('Exit'),
                    onClick: onLogOut,
                },
            ]}
            trigger={<Avatar fallbackInverted className={cls.avatar} size={30} src={authData.avatar} />}
        />
    );
});

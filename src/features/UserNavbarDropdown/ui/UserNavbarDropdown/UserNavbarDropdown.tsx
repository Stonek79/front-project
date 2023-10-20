import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { isUserAdmin, isUserManager, User } from '@/entities/User'
import cls from './UserNavbarDropdown.module.scss'
import {
    getRouteAdminPanel,
    getRouteProfile,
    getRouteSettings,
} from '@/shared/const/router'
import { Dropdown } from '@/shared/ui/redesigned/Popups'
import { Avatar } from '@/shared/ui/redesigned/Avatar'

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

    const adminPanel = isAdminPanelAvailable
        ? [
              {
                  content: t('Admin'),
                  href: getRouteAdminPanel(),
              },
          ]
        : []

    if (!authData) {
        return null
    }

    const items = [
        ...adminPanel,
        {
            content: t('Profile'),
            href: getRouteProfile(authData.id),
        },
        {
            content: t('Settings'),
            href: getRouteSettings(),
        },
        {
            content: t('Exit'),
            onClick: onLogOut,
        },
    ]

    return (
        <Dropdown
            className={cn}
            direction="top right"
            items={items}
            trigger={
                <Avatar
                    className={cls.avatar}
                    size={40}
                    src={authData.avatar}
                />
            }
        />
    )
})

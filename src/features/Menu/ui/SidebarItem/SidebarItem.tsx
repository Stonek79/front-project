import { useTranslation } from 'react-i18next'
import React from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { getUserAuthData } from '@/entities/User'
import { SidebarItemsType } from '../../model/types/sidebar'
import cls from './SidebarItem.module.scss'
import { AppLink } from '@/shared/ui/redesigned/AppLink'

interface SidebarItemProps {
    item: SidebarItemsType
    collapsed: boolean
}

export const SidebarItem = (props: SidebarItemProps) => {
    const { item, collapsed } = props
    const { Icon, text = '', path } = item
    const { t } = useTranslation()
    const isAuth = useSelector(getUserAuthData)

    const cn = classNames(cls.item, { [cls.collapsed]: collapsed })

    if (!isAuth && item.authOnly) {
        return null
    }

    return (
        <AppLink to={path} className={cn}>
            <Icon className={cls.icon} />
            <span className={cls.link}>{t(text)}</span>
        </AppLink>
    )
}

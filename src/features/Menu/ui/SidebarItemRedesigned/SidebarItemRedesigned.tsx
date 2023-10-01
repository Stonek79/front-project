import { useTranslation } from 'react-i18next'
import React from 'react'
import { useSelector } from 'react-redux'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { classNames } from '@/shared/lib/classNames/classNames'
import { getUserAuthData } from '@/entities/User'
import cls from './SidebarItemRedesigned.module.scss'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { SidebarItemsType } from '../../model/types/sidebar'

interface SidebarItemProps {
    item: SidebarItemsType
    collapsed: boolean
}

export const SidebarItemRedesigned = (props: SidebarItemProps) => {
    const { item, collapsed } = props
    const { text = '', path } = item
    const { t } = useTranslation()
    const isAuth = useSelector(getUserAuthData)

    const cn = classNames(cls.item, { [cls.collapsed]: collapsed })

    if (!isAuth && item.authOnly) {
        return null
    }

    return (
        <AppLink to={path} className={cn} activeClassName={cls.active}>
            <Icon Svg={item.Icon} className={cls.icon} />
            <span className={cls.link}>{t(text)}</span>
        </AppLink>
    )
}

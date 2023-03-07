import { useTranslation } from 'react-i18next'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { SidebarItemsType } from '../../model/items'
import cls from './SidebarItem.module.scss'

interface SidebarItemProps {
    item: SidebarItemsType
    collapsed: boolean
}

export const SidebarItem = (props: SidebarItemProps) => {
    const { item, collapsed } = props
    const { Icon, text, path } = item
    const { t } = useTranslation()

    const cn = classNames(cls.item, { [cls.collapsed]: collapsed })

    return (
        <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={path}
            className={cn}
        >
            <Icon className={cls.icon} />
            <span className={cls.link}>{t(text)}</span>
        </AppLink>
    );
};

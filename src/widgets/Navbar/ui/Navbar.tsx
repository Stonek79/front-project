import { classNames } from 'shared/lib/classNames/classNames'
import React, { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User'
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import cls from './Navbar.module.scss'

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const authData = useSelector(getUserAuthData)
    const isAdmin = useSelector(isUserAdmin)
    const isManager = useSelector(isUserManager)

    const cn = classNames(cls.Navbar, {}, [className])

    const onOpenModal = useCallback(() => {
        setIsOpen(true)
    }, [])

    const onCloseModal = useCallback(() => {
        setIsOpen(false)
    }, [])

    const onLogOut = useCallback(() => {
        setIsOpen(false)
        dispatch(userActions.logout())
    }, [dispatch])

    const isAdminPanelAvailable = isAdmin || isManager

    const adminPanel = isAdminPanelAvailable ? [{
        content: t('Admin'),
        href: RoutePath.admin_panel,
    }] : []

    if (authData) {
        return (
            <header className={cn}>
                <Text
                    theme={TextTheme.INVERTED}
                    size={TextSize.L}
                    title={t('StoneK 79')}
                    className={cls.textLink}
                />
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to={RoutePath.article_new}
                >
                    { t('Add article') }
                </AppLink>
                <Dropdown
                    direction="top right"
                    className={cls.links}
                    items={[
                        ...adminPanel,
                        {

                            content: t('Profile'),
                            href: RoutePath.profile + authData.id,
                        },
                        {
                            content: t('Exit'),
                            onClick: onLogOut,
                        },
                    ]}
                    trigger={<Avatar size={30} src={authData.avatar} />}
                />
            </header>
        )
    }

    return (
        <header className={cn}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onOpenModal}
            >
                {t('logIn')}
            </Button>

            {isOpen && <LoginModal isOpen={isOpen} onClose={onCloseModal} />}
        </header>
    )
})

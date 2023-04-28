import React, { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { LoginModal } from '@/features/AuthByUsername'
import {
    getUserAuthData, userActions,
} from '@/entities/User'
import { Text, TextSize, TextTheme } from '@/shared/ui/Text/Text'
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { HStack } from '@/shared/ui/Stack';
import { NotificationButton } from '@/features/NotificationButton';
import { UserNavbarDropdown } from '@/features/UserNavbarDropdown';
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
                <HStack gap="16" className={cls.actions}>
                    <NotificationButton />
                    <UserNavbarDropdown authData={authData} onLogOut={onLogOut} />
                </HStack>
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

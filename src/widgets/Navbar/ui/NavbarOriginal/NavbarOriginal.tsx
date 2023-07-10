import React, { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button'
import {
    Text as TextDeprecated,
    TextSize,
    TextTheme,
} from '@/shared/ui/deprecated/Text'
import {
    AppLink as AppLinkDeprecated,
    AppLinkTheme,
} from '@/shared/ui/deprecated/AppLink'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { getUserAuthData, userActions } from '@/entities/User'
import { LoginModal } from '@/features/AuthByUsername'
import { classNames } from '@/shared/lib/classNames/classNames'
import { NotificationButton } from '@/features/NotificationButton'
import { UserNavbarDropdown } from '@/features/UserNavbarDropdown'
import cls from './NavbarOriginal.module.scss'
import { getRouteArticleNew } from '@/shared/const/router'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

interface NavbarProps {
    className?: string
}

export const NavbarOriginal = memo((props: NavbarProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
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
                <TextDeprecated
                    theme={TextTheme.INVERTED}
                    size={TextSize.L}
                    title={t('StoneK 79')}
                    className={cls.textLink}
                />
                <AppLinkDeprecated
                    theme={AppLinkTheme.SECONDARY}
                    to={getRouteArticleNew()}
                >
                    {t('Add article')}
                </AppLinkDeprecated>
                <HStack gap="16" className={cls.actions}>
                    <NotificationButton />
                    <UserNavbarDropdown
                        authData={authData}
                        onLogOut={onLogOut}
                    />
                </HStack>
            </header>
        )
    }

    return (
        <header className={cn}>
            <ButtonDeprecated
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onOpenModal}
            >
                {t('logIn')}
            </ButtonDeprecated>

            {isOpen && <LoginModal isOpen={isOpen} onClose={onCloseModal} />}
        </header>
    )
})

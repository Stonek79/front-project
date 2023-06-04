import React, { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/shared/ui/redesigned/Button'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { LoginModal } from '@/features/AuthByUsername'
import { getUserAuthData, userActions } from '@/entities/User'
import { NotificationButton } from '@/features/NotificationButton'
import { UserNavbarDropdown } from '@/features/UserNavbarDropdown'
import cls from './NavbarRedesigned.module.scss'

interface NavbarProps {
    className?: string
}

export const NavbarRedesigned = memo((props: NavbarProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const authData = useSelector(getUserAuthData)

    const cn = classNames(cls.NavbarRedesigned, {}, [className])

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
                <HStack gap="16" justify="between" className={cls.actions}>
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
            <Button
                variant="outline"
                className={cls.links}
                onClick={onOpenModal}
            >
                {t('logIn')}
            </Button>

            {isOpen && <LoginModal isOpen={isOpen} onClose={onCloseModal} />}
        </header>
    )
})

import React, { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui/redesigned/Button'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { LoginModal } from '@/features/AuthByUsername'
import { getUserAuthData, userActions } from '@/entities/User'
import { NotificationButton } from '@/features/NotificationButton'
import { UserNavbarDropdown } from '@/features/UserNavbarDropdown'
import cls from './NavbarRedesigned.module.scss'
import { SignUpNewUser } from '@/features/SignUpNewUser'
import { getRouteMain } from '@/shared/const/router'

interface NavbarProps {
    className?: string
}

export const NavbarRedesigned = memo((props: NavbarProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [hasSignUp, setHasSingUp] = useState(false)
    const [isOpenSignUp, setIsOpenSignUp] = useState(false)

    const authData = useSelector(getUserAuthData)
    const navigate = useNavigate()

    const cn = classNames(cls.NavbarRedesigned, {}, [className])

    const onOpenModal = useCallback(() => {
        setIsOpen(true)
    }, [])

    const onCloseModal = useCallback(() => {
        setIsOpen(false)
    }, [])

    const onLogOut = useCallback(() => {
        dispatch(userActions.logout())
        navigate(getRouteMain())
        setIsOpen(false)
        setIsOpenSignUp(false)
    }, [dispatch, navigate])

    const handleSignUp = useCallback(() => {
        setIsOpenSignUp(true)

        setHasSingUp(true)
    }, [])

    const handleCloseSignUp = useCallback(() => {
        setIsOpenSignUp(false)
        setHasSingUp(false)
    }, [])

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
            <HStack gap="16" justify="between">
                <Button
                    variant="outline"
                    className={cls.links}
                    onClick={onOpenModal}
                >
                    {t('logIn')}
                </Button>
                {!hasSignUp && (
                    <Button onClick={handleSignUp}>{t('Sign up')}</Button>
                )}
                {isOpen && (
                    <LoginModal isOpen={isOpen} onClose={onCloseModal} />
                )}
                {isOpenSignUp && (
                    <SignUpNewUser
                        isOpen={isOpenSignUp}
                        onClose={handleCloseSignUp}
                    />
                )}
            </HStack>
        </header>
    )
})

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
import { useResize } from '@/shared/lib/hooks/useResize/useResize'
import { LangSwitcher } from '@/features/LangSwitcher'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { BurgerMenu } from '@/features/Menu'

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

    const { isScreenSm } = useResize()
    const authData = useSelector(getUserAuthData)
    const navigate = useNavigate()

    const cn = classNames(cls.NavbarRedesigned, { [cls.mobile]: !isScreenSm }, [
        className,
    ])

    const btnSize = isScreenSm ? 'm' : 's'

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
                {!isScreenSm && <BurgerMenu />}
                <HStack
                    gap="16"
                    justify={isScreenSm ? 'between' : 'end'}
                    className={cls.actions}
                >
                    {!isScreenSm && (
                        <>
                            <ThemeSwitcher />
                            <LangSwitcher short className={cls.lang} />
                        </>
                    )}
                    <NotificationButton
                        className={(!isScreenSm && cls.center) || ''}
                    />
                    <UserNavbarDropdown
                        className={(!isScreenSm && cls.center) || ''}
                        authData={authData}
                        onLogOut={onLogOut}
                    />
                </HStack>
            </header>
        )
    }

    return (
        <header className={cn}>
            {!isScreenSm && <BurgerMenu />}
            <HStack gap="16" justify={isScreenSm ? 'between' : 'end'}>
                {!isScreenSm && (
                    <>
                        <ThemeSwitcher />
                        <LangSwitcher short className={cls.lang} />
                    </>
                )}
                <Button
                    variant="outline"
                    className={cls.links}
                    onClick={onOpenModal}
                    size={btnSize}
                >
                    {t('logIn')}
                </Button>
                {!hasSignUp && (
                    <Button size={btnSize} onClick={handleSignUp}>
                        {t('Sign up')}
                    </Button>
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

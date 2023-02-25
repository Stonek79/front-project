import { classNames } from 'shared/lib/classNames/classNames'
import { Portal } from 'shared/ui/Portal/Portal'
import { Modal } from 'shared/ui/Modal/Modal'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import cls from './Navbar.module.scss'

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    const cn = classNames(cls.Navbar, {}, [className])

    const onToggleModal = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])

    return (
        <div className={cn}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={() => setIsOpen(true)}
            >
                {t('logIn')}
            </Button>

            <Portal>
                {isOpen && (
                    <Modal isOpen={isOpen} onClose={onToggleModal}>
                        {t('modal')}
                    </Modal>
                )}
            </Portal>
        </div>
    )
}

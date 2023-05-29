import { ReactNode } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { Portal } from '../Portal/Portal'
import cls from './Modal.module.scss'
import { Overlay } from '../Overlay/Overlay'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

/**
 * The component is outdated, we use the new one from the redesigned folder
 * @deprecated
 */
export const Modal = (props: ModalProps) => {
    const { children, className, isOpen, onClose, lazy } = props

    const { theme } = useTheme()

    const { close, isClosing, isMounted } = useModal({
        onClose,
        isOpen,
        animationDelay: 300,
    })

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    }

    const cn = classNames(cls.Modal, mods, [className, theme])

    if (lazy && !isMounted) {
        return null
    }

    return (
        <Portal>
            <div className={cn}>
                <Overlay className={className} onClick={close} />
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    )
}

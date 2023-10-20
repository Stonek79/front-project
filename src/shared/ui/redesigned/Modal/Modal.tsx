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
    clearBack?: boolean
}

export const Modal = (props: ModalProps) => {
    const { children, className, isOpen, onClose, lazy, clearBack } = props

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

    const design = cls.modalNew
    const cn = classNames(cls.Modal, mods, [className, theme, design])
    const cnContent = classNames(cls.content, { [cls.clearBack]: clearBack })

    if (lazy && !isMounted) {
        return null
    }

    return (
        <Portal container={document.getElementById('app') ?? document.body}>
            <div className={cn}>
                <Overlay className={className} onClick={close} />
                <div className={cnContent}>{children}</div>
            </div>
        </Portal>
    )
}

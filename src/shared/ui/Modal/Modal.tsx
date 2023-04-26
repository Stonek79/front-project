import { ReactNode } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Portal } from '../../ui/Portal/Portal'
import cls from './Modal.module.scss'
import { Overlay } from '../Overlay/Overlay';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean
}

export const Modal = (props: ModalProps) => {
    const {
        children,
        className,
        isOpen,
        onClose,
        lazy,
    } = props

    const { theme } = useTheme()

    const {
        close,
        isClosing,
        isMounted,
    } = useModal({
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
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    )
}

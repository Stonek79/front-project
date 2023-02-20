import {
    FC, ReactNode, MouseEvent, useState, useRef, useEffect, useCallback,
} from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Modal.module.scss'

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const ANIMATION_DELAY = 300

export const Modal: FC<ModalProps> = (props) => {
    const {
        children, className, isOpen, onClose,
    } = props

    const [isClosing, setIsClosing] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>()

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, ANIMATION_DELAY)
        }
    }, [onClose, setIsClosing])

    const onContentClick = (e: MouseEvent) => {
        e.stopPropagation()
    }

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler()
        }
    }, [closeHandler])

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    }

    const cn = classNames(cls.Modal, mods, [className])
    const cnContent = classNames(cls.content, {}, [cls[className]])

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }

        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, onKeyDown])

    return (
        <div className={cn}>
            <div className={cls.overlay} onClick={closeHandler}>
                <div className={cnContent} onClick={onContentClick}>
                    {children}
                </div>
            </div>
        </div>
    )
}

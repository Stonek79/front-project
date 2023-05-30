import { memo, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Overlay.module.scss'

interface OverlayProps {
    className?: string
    onClick?: () => void
    children?: ReactNode
}

export const Overlay = memo((props: OverlayProps) => {
    const { className, onClick, children } = props

    const cn = classNames(cls.Overlay, {}, [className])

    return (
        <div className={cn} onClick={onClick}>
            {children}
        </div>
    )
})

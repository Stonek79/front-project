import { HTMLAttributes, memo, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Card.module.scss'

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINE = 'outline',
}

interface CardProps extends HTMLAttributes<HTMLDivElement>{
    className?: string
    children?: ReactNode
    theme?: CardTheme
}

export const Card = memo((props: CardProps) => {
    const {
        theme = CardTheme.OUTLINE,
        className,
        children,
        ...otherProps
    } = props
    const { t } = useTranslation()

    const cn = classNames(cls.Card, {}, [className, cls[theme]])

    return (
        <div {...otherProps} className={cn}>
            {children}
        </div>
    )
})

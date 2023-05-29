import { HTMLAttributes, memo, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Card.module.scss'

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINE = 'outline',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
    children?: ReactNode
    theme?: CardTheme
    max?: boolean
}

/**
 * The component is outdated, we use the new one from the redesigned folder
 * @deprecated
 */
export const Card = memo((props: CardProps) => {
    const {
        theme = CardTheme.OUTLINE,
        className,
        children,
        max,
        ...otherProps
    } = props

    const cn = classNames(cls.Card, { [cls.max]: max }, [className, cls[theme]])

    return (
        <div {...otherProps} className={cn}>
            {children}
        </div>
    )
})

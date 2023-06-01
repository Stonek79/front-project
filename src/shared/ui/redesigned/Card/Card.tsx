import { HTMLAttributes, memo, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Card.module.scss'

export type CardVariant = 'normal' | 'outline' | 'light'
export type CardPaddings = '0' | '8' | '16' | '24' | '32'
export type CardBorder = 'standard' | 'rounded'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
    children?: ReactNode
    variant?: CardVariant
    max?: boolean
    cardPaddings?: CardPaddings
    cardBorder?: CardBorder
}

const mapPaddingsToClass: Record<CardPaddings, string> = {
    '0': 'gap_0',
    '8': 'gap_8',
    '16': 'gap_16',
    '24': 'gap_24',
    '32': 'gap_32',
}

export const Card = memo((props: CardProps) => {
    const {
        variant = 'normal',
        className,
        children,
        max,
        cardPaddings = '16',
        cardBorder = 'standard',
        ...otherProps
    } = props

    const cn = classNames(cls.Card, { [cls.max]: max }, [
        className,
        cls[variant],
        cls[cardBorder],
        cls[mapPaddingsToClass[cardPaddings]],
    ])

    return (
        <div {...otherProps} className={cn}>
            {children}
        </div>
    )
})

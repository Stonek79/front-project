import { HTMLAttributes, memo, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Card.module.scss'

export type CardVariant = 'normal' | 'outline' | 'light' | 'clear'
export type CardPaddings = '0' | '4' | '8' | '16' | '24' | '32'
export type CardGap = '0' | '4' | '8' | '16' | '24' | '32'
export type CardBorder = 'none' | 'standard' | 'rounded' | 'partial'
type OnClick<T> = (args?: T) => T

interface BaseCardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
    children?: ReactNode
    variant?: CardVariant
    max?: boolean
    cardPaddings?: CardPaddings
    cardBorder?: CardBorder
    gap?: CardGap
}

interface ClickableCardProps extends BaseCardProps {
    clickable: true
    onClick: OnClick<any>
}

interface CommonCardProps extends BaseCardProps {
    clickable?: false
}

type CardProps = ClickableCardProps | CommonCardProps

const mapPaddingsToClass: Record<CardPaddings, string> = {
    '0': 'pad_0',
    '4': 'pad_4',
    '8': 'pad_8',
    '16': 'pad_16',
    '24': 'pad_24',
    '32': 'pad_32',
}

const mapGapToClass: Record<CardGap, string> = {
    '0': 'gap_0',
    '4': 'gap_4',
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
        gap = '0',
        clickable,
        ...otherProps
    } = props

    const cn = classNames(
        cls.Card,
        { [cls.max]: max, [cls.cursor]: clickable },
        [
            className,
            cls[variant],
            cls[cardBorder],
            cls[mapPaddingsToClass[cardPaddings]],
            cls[mapGapToClass[gap]],
        ],
    )

    if (clickable) {
        return (
            <div {...otherProps} onClick={props.onClick} className={cn}>
                {children}
            </div>
        )
    }

    return (
        <div {...otherProps} className={cn}>
            {children}
        </div>
    )
})

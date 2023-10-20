import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Flex.module.scss'

export type FlexJustify = 'start' | 'center' | 'end' | 'between'
export type FlexAlign = 'start' | 'center' | 'end'
export type FlexDirection = 'row' | 'column'
export type FlexWrap = 'wrap' | 'nowrap'
export type FlexGap = '4' | '8' | '16' | '24' | '32'
export type FlexPaddings = '0' | '4' | '8' | '16' | '24' | '32'

const justifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    between: cls.justifyBetween,
}

const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
}

const directionClasses: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn,
}

const gapClasses: Record<FlexGap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    24: cls.gap24,
    32: cls.gap32,
}

const paddingClasses: Record<FlexPaddings, string> = {
    0: cls.p0,
    4: cls.p4,
    8: cls.p8,
    16: cls.p16,
    24: cls.p24,
    32: cls.p32,
}

type DivProps = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>

export interface FlexProps extends DivProps {
    className?: string
    children: ReactNode
    justify?: FlexJustify
    align?: FlexAlign
    direction: FlexDirection
    gap?: FlexGap
    max?: boolean
    wrap?: FlexWrap
    padding?: FlexPaddings
}

export const Flex = (props: FlexProps) => {
    const {
        className,
        children,
        justify = 'start',
        align = 'center',
        direction = 'row',
        gap,
        max,
        wrap = 'nowrap',
        padding = '0',
        ...otherProps
    } = props

    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        gap && gapClasses[gap],
        cls[wrap],
        padding && paddingClasses[padding],
    ]

    const mods: Mods = {
        [cls.max]: max,
    }

    const cn = classNames(cls.Flex, mods, classes)

    return (
        <div className={cn} {...otherProps}>
            {children}
        </div>
    )
}

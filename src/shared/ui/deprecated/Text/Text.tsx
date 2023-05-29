import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Text.module.scss'

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
    INVERTED = 'secondary',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

export enum TextSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

interface TextProps {
    className?: string
    text?: string
    title?: string
    theme?: TextTheme
    align?: TextAlign
    size?: TextSize
    'data-testid'?: string
}

type HeaderTagType = 'h1' | 'h2' | 'h3'

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.S]: 'h3',
    [TextSize.M]: 'h2',
    [TextSize.L]: 'h1',
}

/**
 * The component is outdated, we use the new one from the redesigned folder
 * @deprecated
 */
export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
        'data-testid': dataTestId = 'Test',
    } = props

    const HeaderTag = mapSizeToHeaderTag[size]

    const cn = classNames('', {}, [
        className,
        cls[theme],
        cls[align],
        cls[size],
    ])

    return (
        <div className={cn}>
            {title && (
                <HeaderTag
                    data-testid={`${dataTestId}-header`}
                    className={cls.title}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p data-testid={`${dataTestId}-paragraph`} className={cls.text}>
                    {text}
                </p>
            )}
        </div>
    )
})

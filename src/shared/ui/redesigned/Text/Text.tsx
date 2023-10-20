import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Text.module.scss'

export type TextVariant = 'primary' | 'error' | 'accent' | 'tag' | 'success'
export type TextAlign = 'right' | 'left' | 'center' | 'justify'
export type SelfAlign = 'start' | 'end' | 'centered' | 'auto'
export type TextSize = 's' | 'm' | 'l'

interface TextProps {
    className?: string
    text?: string
    title?: string
    variant?: TextVariant
    align?: TextAlign
    self?: SelfAlign
    size?: TextSize
    bold?: boolean
    cursive?: boolean
    'data-testing'?: string
    lang?: string
    indent?: boolean
}

type HeaderTagType = 'h1' | 'h2' | 'h3'

const mapSizeToClass: Record<TextSize, string> = {
    s: cls.size_s,
    m: cls.size_m,
    l: cls.size_l,
}

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        variant = 'primary',
        align = 'left',
        size = 'm',
        self = 'auto',
        bold,
        cursive,
        lang,
        'data-testing': dataTestId = 'Test',
        indent,
    } = props

    const HeaderTag = mapSizeToHeaderTag[size]
    const sizeClass = mapSizeToClass[size]

    const cn = classNames(
        '',
        { [cls.indent]: indent, [cls.bold]: bold, [cls.cursive]: cursive },
        [className, cls[variant], cls[align], sizeClass, cls[self]],
    )

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
                <p
                    lang={lang}
                    data-testid={`${dataTestId}-paragraph`}
                    className={cls.text}
                >
                    {text}
                </p>
            )}
        </div>
    )
})

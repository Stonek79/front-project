import { classNames, Mods } from 'shared/lib/classNames/classNames'
import { ButtonHTMLAttributes, memo, ReactNode } from 'react'
import cls from './Button.module.scss'

export enum ButtonTheme {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outline_red',
    BG = 'background',
    BG_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
    L = 'size_l',
    M = 'size_m',
    XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean
    children?: ReactNode
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        theme = ButtonTheme.OUTLINE,
        square,
        disabled = false,
        size = ButtonSize.M,
        ...otherProps
    } = props

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
    }

    const cn = classNames(cls.Button, mods, [className, cls[theme], cls[size]])

    return (
        <button
            type="button"
            disabled={disabled}
            className={cn}
            {...otherProps}
        >
            {children}
        </button>
    )
})

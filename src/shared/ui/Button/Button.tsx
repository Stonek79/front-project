import { classNames } from 'shared/lib/classNames/classNames'
import { ButtonHTMLAttributes, FC } from 'react'
import cls from './Button.module.scss'

export enum ButtonTheme {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
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
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        theme,
        square,
        disabled = false,
        size = ButtonSize.M,
        ...otherProps
    } = props

    const mods: Record<string, boolean> = {
        [cls.square]: square,
        [cls.disabled]: disabled,
    }
    return (
        <button
            type="button"
            disabled={disabled}
            className={classNames(cls.Button, mods, [className, cls[theme], cls[size]])}
            {...otherProps}
        >
            {children}
        </button>
    )
}

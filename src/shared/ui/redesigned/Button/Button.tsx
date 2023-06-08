import { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export type ButtonVariant = 'clear' | 'outline' | 'filled'
export type ButtonColor = 'normal' | 'success' | 'error'

export type ButtonSize = 'l' | 'm' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    variant?: ButtonVariant
    square?: boolean
    size?: ButtonSize
    disabled?: boolean
    children?: ReactNode
    fullWidth?: boolean
    addonLeft?: ReactElement
    addonRight?: ReactElement
    right?: boolean
    color?: ButtonColor
}

export const Button = (props: ButtonProps) => {
    const {
        className,
        children,
        variant = 'outline',
        square,
        disabled = false,
        size = 'm',
        fullWidth,
        right = false,
        color = 'normal',
        addonLeft,
        addonRight,
        ...otherProps
    } = props

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth,
        [cls.right]: right,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
    }

    const cn = classNames(cls.Button, mods, [
        className,
        cls[variant],
        cls[size],
        cls[color],
    ])

    return (
        <button
            type="button"
            disabled={disabled}
            className={cn}
            {...otherProps}
        >
            <div className={cls.addonLeft}>{addonLeft}</div>
            {children}
            <div className={cls.addonRight}>{addonRight}</div>
        </button>
    )
}

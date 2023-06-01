import { ButtonHTMLAttributes, memo, ReactElement, ReactNode } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export type ButtonVariant = 'clear' | 'outline' | 'filled'

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
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        variant = 'outline',
        square,
        disabled = false,
        size = 'm',
        fullWidth,
        addonLeft,
        addonRight,
        ...otherProps
    } = props

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
    }

    const cn = classNames(cls.Button, mods, [
        className,
        cls[variant],
        cls[size],
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
})

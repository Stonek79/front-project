import {
    ButtonHTMLAttributes,
    ForwardedRef,
    forwardRef,
    ReactElement,
    ReactNode,
} from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export type ButtonVariant = 'clear' | 'outline' | 'filled'
export type ButtonColor = 'normal' | 'success' | 'error'
export type TextWrap = 'normal' | 'nowrap'

export type ButtonSize = 's' | 'm' | 'l' | 'xl'

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
    wrap?: TextWrap
}

export const Button = forwardRef(
    (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
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
            wrap = 'nowrap',
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
            cls[wrap],
        ])

        return (
            <button
                ref={ref}
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
    },
)

import { LinkProps, NavLink } from 'react-router-dom'
import { forwardRef, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AppLink.module.scss'

export type AppLinkVariant = 'primary' | 'red'

interface AppLinkProps extends LinkProps {
    className?: string
    variant?: AppLinkVariant
    activeClassName?: string
}

export const AppLink = memo(
    forwardRef<HTMLLinkElement, AppLinkProps>((props, ref) => {
        const {
            to,
            className,
            children,
            variant = 'primary',
            activeClassName = '',
            ...otherProps
        } = props

        const cn = (isActive: boolean) =>
            classNames(cls.AppLink, { [activeClassName]: isActive }, [
                className,
                cls[variant],
            ])

        return (
            <NavLink
                to={to}
                className={({ isActive }) => cn(isActive)}
                {...otherProps}
            >
                {children}
            </NavLink>
        )
    }),
)

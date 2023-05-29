import { Link, LinkProps } from 'react-router-dom'
import { forwardRef, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AppLink.module.scss'

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}

interface AppLinkProps extends LinkProps {
    className?: string
    theme?: AppLinkTheme
}

/**
 * The component is outdated, we use the new one from the redesigned folder
 * @deprecated
 */
export const AppLink = memo(
    forwardRef<HTMLLinkElement, AppLinkProps>((props, ref) => {
        const {
            to,
            className,
            children,
            theme = AppLinkTheme.PRIMARY,
            ...otherProps
        } = props

        return (
            <Link
                to={to}
                className={classNames(cls.AppLink, {}, [className, cls[theme]])}
                {...otherProps}
            >
                {children}
            </Link>
        )
    }),
)

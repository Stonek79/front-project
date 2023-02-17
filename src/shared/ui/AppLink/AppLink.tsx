import { classNames } from 'shared/lib/classNames/classNames'
import { FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import cls from './AppLink.module.scss'

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red'
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme
}

export const AppLink: FC<AppLinkProps> = (props) => {
    const {
        to,
        className,
        children,
        theme = AppLinkTheme.PRIMARY,
        ...otherProps
    } = props

    const cn = classNames(cls.AppLink, [className, cls[theme]])

    return (
        <Link
            to={to}
            className={cn}
            {...otherProps}
        >
            {children}
        </Link>
    )
}

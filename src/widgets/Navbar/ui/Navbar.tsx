import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { useTranslation } from 'react-i18next'
import { RoutePath } from 'shared/config/routePaths'
import { FC } from 'react'
import cls from './Navbar.module.scss'

interface NavbarProps {
    className?: string;
}

export const Navbar: FC<NavbarProps> = (props) => {
    const { className } = props
    const { t } = useTranslation()
    const cn = classNames(cls.Navbar, [className])

    return (
        <div className={cn}>
            <div className={cls.links}>
                <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    className={cls.mainLink}
                    to={RoutePath.main}
                >
                    {t('mainPageCapitalize')}
                </AppLink>
                <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to={RoutePath.about}
                >
                    {t('aboutPageCapitalize')}
                </AppLink>
            </div>
        </div>
    )
}

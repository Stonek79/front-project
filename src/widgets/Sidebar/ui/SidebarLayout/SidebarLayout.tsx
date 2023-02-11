import { FC, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { ThemeSwitcher } from 'features/ThemeSwitcher'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { LangSwitcher } from 'features/LangSwitcher'
import cls from './SidebarLayout.module.scss'

interface SidebarLayoutProps {
    className?: string;
}

export const SidebarLayout: FC<SidebarLayoutProps> = (props) => {
    const [collapsed, setCollapsed] = useState(true)
    const { t } = useTranslation()

    const onToggle = () => {
        setCollapsed(!collapsed)
    }

    const { className } = props
    const cn = classNames(cls.SidebarLayout, [className], { [cls.collapsed]: collapsed })
    const btnName = collapsed ? t('sidebarOpen') : t('sidebarClose')

    return (
        <div className={cn}>
            <Button
                theme={ButtonTheme.LIGHT}
                onClick={onToggle}
                className={cls.btn}
            >
                {btnName}
            </Button>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={cls.btn} />
            </div>
        </div>
    )
}

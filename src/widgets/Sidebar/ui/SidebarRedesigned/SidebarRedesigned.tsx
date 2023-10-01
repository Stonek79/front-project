import { memo, useState } from 'react'
import { AppLogo } from '@/shared/ui/redesigned/AppLogo'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './SidebarRedesigned.module.scss'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { LangSwitcher } from '@/features/LangSwitcher'
import { Icon } from '@/shared/ui/redesigned/Icon'
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg'
import { Flex } from '@/shared/ui/redesigned/Stack/Flex/Flex'
import { AccountsLinks, MenuList } from '@/features/Menu'

interface SidebarProps {
    className?: string
}

export const SidebarRedesigned = memo((props: SidebarProps) => {
    const { className } = props
    const [collapsed, setCollapsed] = useState(false)

    const onToggle = () => {
        setCollapsed((prev) => !prev)
    }

    const cn = classNames(
        cls.SidebarRedesigned,
        { [cls.collapsed]: collapsed },
        [className],
    )

    return (
        <div data-testid="sidebar" className={cn}>
            <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} />
            <MenuList collapsed={collapsed} />
            <div className={cls.collapseBtn}>
                <Icon
                    data-testid="sidebar-toggle"
                    onClick={onToggle}
                    Svg={ArrowIcon}
                    clickable
                />
            </div>
            <AccountsLinks className={cls.accounts} short={collapsed} />
            <Flex
                direction={collapsed ? 'column' : 'row'}
                className={cls.switchers}
            >
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </Flex>
        </div>
    )
})

import { memo, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppLogo } from '@/shared/ui/redesigned/AppLogo'
import { classNames } from '@/shared/lib/classNames/classNames'
import { SidebarItemRedesigned } from '../SidebarItemRedesigned/SidebarItemRedesigned'
import cls from './SidebarRedesigned.module.scss'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'
import { VStack } from '@/shared/ui/deprecated/Stack'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { LangSwitcher } from '@/features/LangSwitcher'
import { Icon } from '@/shared/ui/redesigned/Icon'
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg'

interface SidebarProps {
    className?: string
}

export const SidebarRedesigned = memo((props: SidebarProps) => {
    const { className } = props
    const [collapsed, setCollapsed] = useState(false)
    const sidebarItemsList = useSelector(getSidebarItems)

    const onToggle = () => {
        setCollapsed((prev) => !prev)
    }

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItemRedesigned
                    key={item.path}
                    item={item}
                    collapsed={collapsed}
                />
            )),
        [collapsed, sidebarItemsList],
    )

    const cn = classNames(
        cls.SidebarRedesigned,
        { [cls.collapsed]: collapsed },
        [className],
    )

    return (
        <aside data-testid="sidebar" className={cn}>
            <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} />
            <VStack role="navigation" gap="8" className={cls.items}>
                {itemsList}
            </VStack>
            <Icon
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={cls.collapseBtn}
                Svg={ArrowIcon}
                clickable
            />
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
        </aside>
    )
})

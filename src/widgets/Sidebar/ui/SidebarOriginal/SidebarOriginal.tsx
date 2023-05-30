import { memo, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { LangSwitcher } from '@/features/LangSwitcher'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import cls from './SidebarOriginal.module.scss'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'

interface SidebarProps {
    className?: string
}

export const SidebarOriginal = memo((props: SidebarProps) => {
    const { className } = props
    const [collapsed, setCollapsed] = useState(false)
    const sidebarItemsList = useSelector(getSidebarItems)

    const onToggle = () => {
        setCollapsed((prev) => !prev)
    }

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItem
                    key={item.path}
                    item={item}
                    collapsed={collapsed}
                />
            )),
        [collapsed, sidebarItemsList],
    )

    const cn = classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className,
    ])

    return (
        <aside data-testid="sidebar" className={cn}>
            <Button
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={cls.collapseBtn}
                theme={ButtonTheme.BG_INVERTED}
                size={ButtonSize.L}
                square
            >
                {collapsed ? '>' : '<'}
            </Button>
            <VStack role="navigation" gap="8" className={cls.items}>
                {itemsList}
            </VStack>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
        </aside>
    )
})

import { memo, useState } from 'react'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { LangSwitcher } from '@/features/LangSwitcher'
import cls from './SidebarOriginal.module.scss'
import { MenuList } from '@/features/Menu'

interface SidebarProps {
    className?: string
}

export const SidebarOriginal = memo((props: SidebarProps) => {
    const { className } = props
    const [collapsed, setCollapsed] = useState(false)

    const onToggle = () => {
        setCollapsed((prev) => !prev)
    }

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
            <MenuList collapsed={collapsed} />
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
        </aside>
    )
})

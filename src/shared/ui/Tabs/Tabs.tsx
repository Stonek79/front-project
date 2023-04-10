import { classNames } from 'shared/lib/classNames/classNames'
import { ReactNode, useCallback } from 'react'
// eslint-disable-next-line fsd-paths-checker-plugin/fsd-paths-checker-plugin
import { Card, CardTheme } from 'shared/ui/Card/Card'
import cls from './Tabs.module.scss'

export interface TabItem<T extends string> {
    value: string,
    content: ReactNode
}

interface TabsProps<T extends string> {
    className?: string,
    tabs: TabItem<T>[],
    value: T,
    onTabClick: (tab: TabItem<T>) => void
}

export const Tabs = <T extends string>(props: TabsProps<T>) => {
    const {
        className, onTabClick, tabs, value,
    } = props

    const cn = classNames(cls.Tabs, {}, [className])

    const clickHandle = useCallback((tab: TabItem<T>) => () => onTabClick(tab), [onTabClick])

    return (
        <div className={cn}>
            {tabs.map((tab) => (
                <Card
                    className={cls.tab}
                    key={tab.value}
                    onClick={clickHandle(tab)}
                    theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINE}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    )
}

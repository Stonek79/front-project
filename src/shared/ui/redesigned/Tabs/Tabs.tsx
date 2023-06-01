import { ReactNode, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '../Card/Card'
import cls from './Tabs.module.scss'
import { Flex, FlexDirection } from '../Stack/Flex/Flex'

export interface TabItem<T extends string> {
    value: string
    content: ReactNode
}

interface TabsProps<T extends string> {
    className?: string
    tabs: TabItem<T>[]
    value: T
    onTabClick: (tab: TabItem<T>) => void
    direction?: FlexDirection
}
export const Tabs = <T extends string>(props: TabsProps<T>) => {
    const { className, onTabClick, tabs, value, direction = 'row' } = props

    const cn = classNames(cls.Tabs, {}, [className])

    const clickHandle = useCallback(
        (tab: TabItem<T>) => () => onTabClick(tab),
        [onTabClick],
    )

    return (
        <Flex align="start" direction={direction} className={cn}>
            {tabs.map((tab) => (
                <Card
                    className={cls.tab}
                    key={tab.value}
                    onClick={clickHandle(tab)}
                    variant={tab.value !== value ? 'normal' : 'light'}
                    cardBorder="rounded"
                >
                    {tab.content}
                </Card>
            ))}
        </Flex>
    )
}

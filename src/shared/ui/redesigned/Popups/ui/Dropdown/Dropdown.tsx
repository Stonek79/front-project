import { Fragment, memo, ReactNode } from 'react'
import { Menu } from '@headlessui/react'
import { DropdownDirection } from '@/shared/types/ui'
import cls from './Dropdown.module.scss'
import clsPopup from '../../styles/Popups.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '../../../AppLink/AppLink'
import { MapDirectionClass } from '../../styles/consts'

export interface DropdownItem {
    disabled?: boolean
    title?: string
    content?: ReactNode
    onClick?: () => void
    href?: string
}

interface DropdownProps {
    className?: string
    items: DropdownItem[]
    trigger: ReactNode
    direction: DropdownDirection
}
export const Dropdown = memo((props: DropdownProps) => {
    const { className, trigger, items, direction = 'bottom right' } = props

    const cn = classNames(clsPopup.popup, {}, [className])
    const menuCN = classNames(clsPopup.options, {}, [
        MapDirectionClass[direction],
    ])

    return (
        <Menu as="div" className={cn}>
            <Menu.Button className={clsPopup.trigger}>{trigger}</Menu.Button>
            <Menu.Items className={menuCN}>
                {items.map((item, i) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            onClick={item.onClick}
                            className={classNames(cls.menuItem, {
                                [cls.active]: active,
                            })}
                        >
                            {item.content}
                        </button>
                    )

                    if (item.href) {
                        return (
                            // eslint-disable-next-line react/no-array-index-key
                            <Menu.Item
                                key={`menu-item-${i}`}
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </Menu.Item>
                        )
                    }

                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <Menu.Item
                            key={`menu-item-${i}`}
                            as={Fragment}
                            disabled={item.disabled}
                        >
                            {content}
                        </Menu.Item>
                    )
                })}
            </Menu.Items>
        </Menu>
    )
})

import { Popover as HPopover } from '@headlessui/react'
import { ReactNode } from 'react'
import { DropdownDirection } from '@/shared/types/ui'
import { classNames } from '@/shared/lib/classNames/classNames'
import clsPopup from '../../styles/Popups.module.scss'
import { MapDirectionClass } from '../../styles/consts'
import cls from './Popover.module.scss'

export interface PopoverProps {
    className?: string
    children?: ReactNode
    trigger: ReactNode
    direction: DropdownDirection
}
export const Popover = (props: PopoverProps) => {
    const { className, children, direction, trigger } = props
    const cn = classNames(clsPopup.popup, {}, [className])

    const menuCN = classNames(clsPopup.options, {}, [
        cls.Popover,
        MapDirectionClass[direction],
    ])

    return (
        <HPopover className={cn}>
            <HPopover.Button as="div" className={clsPopup.trigger}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel className={menuCN}>{children}</HPopover.Panel>
        </HPopover>
    )
}

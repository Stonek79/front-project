import React, { memo, useCallback, useState } from 'react'
import NotificationIcon from '@/shared/assets/icons/notification.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { NotificationList } from '@/entities/Notification'
import cls from './NotificationButton.module.scss'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { Popover } from '@/shared/ui/redesigned/Popups'
import { Drawer } from '@/shared/ui/redesigned/Drawer'
import { useResize } from '@/shared/lib/hooks/useResize/useResize'

interface NotificationButtonProps {
    className?: string
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props
    const [isOpen, setIsOpen] = useState(false)

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true)
    }, [])

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false)
    }, [])

    const { isScreenMd } = useResize()

    const cn = classNames(cls.NotificationButton, {}, [className])

    const trigger = (
        <Icon
            className={className}
            clickable
            onClick={onOpenDrawer}
            Svg={NotificationIcon}
            width={32}
            height={32}
        />
    )

    return (
        <div>
            {isScreenMd ? (
                <div>
                    <Popover
                        className={cn}
                        trigger={trigger}
                        direction="top right"
                    >
                        <NotificationList className={cls.notifications} />
                    </Popover>
                </div>
            ) : (
                <div>
                    {trigger}
                    <Drawer
                        className={cls.mobile}
                        isOpen={isOpen}
                        onClose={onCloseDrawer}
                    >
                        <NotificationList />
                    </Drawer>
                </div>
            )}
        </div>
    )
})

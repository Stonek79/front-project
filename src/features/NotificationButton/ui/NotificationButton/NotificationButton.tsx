import React, { memo, useCallback, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Icon } from '@/shared/ui/deprecated/Icon'
import { Popover } from '@/shared/ui/deprecated/Popups'
import { Drawer } from '@/shared/ui/deprecated/Drawer'
import NotificationIcon from '@/shared/assets/icons/notification.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { NotificationList } from '@/entities/Notification'
import cls from './NotificationButton.module.scss'

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

    const cn = classNames(cls.NotificationButton, {}, [className])

    const trigger = (
        <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
            <Icon Svg={NotificationIcon} width={32} height={32} inverted />
        </Button>
    )

    return (
        <div>
            <BrowserView>
                <Popover className={cn} trigger={trigger} direction="top right">
                    <NotificationList className={cls.notifications} />
                </Popover>
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer
                    className={cls.mobile}
                    isOpen={isOpen}
                    onClose={onCloseDrawer}
                >
                    <NotificationList />
                </Drawer>
            </MobileView>
        </div>
    )
})

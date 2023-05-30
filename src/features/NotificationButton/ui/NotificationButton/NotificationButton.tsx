import React, { memo, useCallback, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import { Popover as PopoverDeprecate } from '@/shared/ui/deprecated/Popups'
import { Drawer } from '@/shared/ui/deprecated/Drawer'
import NotificationIcon from '@/shared/assets/icons/notification.svg'
import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { NotificationList } from '@/entities/Notification'
import cls from './NotificationButton.module.scss'
import { ToggleComponentFeatures } from '@/shared/lib/features'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { Popover } from '@/shared/ui/redesigned/Popups'

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
        <ToggleComponentFeatures
            feature="isAppRedesigned"
            on={
                <Icon
                    clickable
                    onClick={onOpenDrawer}
                    Svg={NotificationIcon}
                    width={32}
                    height={32}
                />
            }
            off={
                <ButtonDeprecated
                    onClick={onOpenDrawer}
                    theme={ButtonTheme.CLEAR}
                >
                    <IconDeprecated
                        Svg={NotificationIconDeprecated}
                        width={32}
                        height={32}
                        inverted
                    />
                </ButtonDeprecated>
            }
        />
    )

    return (
        <div>
            <BrowserView>
                <ToggleComponentFeatures
                    feature="isAppRedesigned"
                    on={
                        <Popover
                            className={cn}
                            trigger={trigger}
                            direction="top right"
                        >
                            <NotificationList className={cls.notifications} />
                        </Popover>
                    }
                    off={
                        <PopoverDeprecate
                            className={cn}
                            trigger={trigger}
                            direction="top right"
                        >
                            <NotificationList className={cls.notifications} />
                        </PopoverDeprecate>
                    }
                />
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

import React, { memo, useCallback, useState } from 'react'
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import { Popover as PopoverDeprecate } from '@/shared/ui/deprecated/Popups'
import NotificationIcon from '@/shared/assets/icons/notification.svg'
import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { NotificationList } from '@/entities/Notification'
import cls from './NotificationButton.module.scss'
import { ToggleComponentFeatures } from '@/shared/lib/features'
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
        <ToggleComponentFeatures
            feature="isAppRedesigned"
            on={
                <Icon
                    className={className}
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
            {isScreenMd ? (
                <div>
                    <ToggleComponentFeatures
                        feature="isAppRedesigned"
                        on={
                            <Popover
                                className={cn}
                                trigger={trigger}
                                direction="top right"
                            >
                                <NotificationList
                                    className={cls.notifications}
                                />
                            </Popover>
                        }
                        off={
                            <PopoverDeprecate
                                className={cn}
                                trigger={trigger}
                                direction="top right"
                            >
                                <NotificationList
                                    className={cls.notifications}
                                />
                            </PopoverDeprecate>
                        }
                    />
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

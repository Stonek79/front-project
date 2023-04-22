import { classNames } from 'shared/lib/classNames/classNames'
import React, { memo } from 'react'
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import { NotificationList } from 'entities/Notifcation';
import { Popover } from 'shared/ui/Popups';
import cls from './NotificationButton.module.scss'

interface NotificationButtonProps {
    className?: string
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props

    const cn = classNames(cls.NotificationButton, {}, [className])

    return (
        <Popover
            className={cn}
            trigger={(
                <Button theme={ButtonTheme.CLEAR}>
                    <Icon Svg={NotificationIcon} inverted />
                </Button>
            )}
            direction="top right"
        >
            <NotificationList className={cls.notifications} />
        </Popover>
    );
});

import { classNames } from 'shared/lib/classNames/classNames'
import { memo } from 'react'
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Text } from 'shared/ui/Text/Text';
import cls from './NotificationItem.module.scss'
import { Notifications } from '../../model/types/notifications';

interface NotificationItemProps {
    className?: string
    item?: Notifications
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props

    const cn = classNames(cls.NotificationItem, {}, [className])

    const content = (
        <Card theme={CardTheme.OUTLINE} className={cn}>
            <Text title={item?.title} text={item?.description} />
        </Card>
    )

    if (item?.href) {
        return (
            <AppLink className={cn} target="_blank" to={item?.href}>
                {content}
            </AppLink>
        )
    }

    return content;
});

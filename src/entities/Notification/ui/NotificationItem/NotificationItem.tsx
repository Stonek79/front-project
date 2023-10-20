import { memo } from 'react'
import { Text } from '@/shared/ui/redesigned/Text'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './NotificationItem.module.scss'
import { Notifications } from '../../model/types/notifications'
import { Card } from '@/shared/ui/redesigned/Card'
import { AppLink } from '@/shared/ui/redesigned/AppLink'

interface NotificationItemProps {
    className?: string
    item?: Notifications
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props

    const cn = classNames(cls.NotificationItem, {}, [className])

    const content = (
        <Card variant="outline" className={cn}>
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

    return content
})

import { memo } from 'react'
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card'
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink'
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './NotificationItem.module.scss'
import { Notifications } from '../../model/types/notifications'
import { ToggleComponentFeatures } from '@/shared/lib/features'
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
        <ToggleComponentFeatures
            feature="isAppRedesigned"
            on={
                <Card variant="outline" className={cn}>
                    <Text title={item?.title} text={item?.description} />
                </Card>
            }
            off={
                <CardDeprecated theme={CardTheme.OUTLINE} className={cn}>
                    <TextDeprecated
                        title={item?.title}
                        text={item?.description}
                    />
                </CardDeprecated>
            }
        />
    )

    if (item?.href) {
        return (
            <ToggleComponentFeatures
                feature="isAppRedesigned"
                on={
                    <AppLink className={cn} target="_blank" to={item?.href}>
                        {content}
                    </AppLink>
                }
                off={
                    <AppLinkDeprecated
                        className={cn}
                        target="_blank"
                        to={item?.href}
                    >
                        {content}
                    </AppLinkDeprecated>
                }
            />
        )
    }

    return content
})

import { memo } from 'react'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useNotifications } from '../../api/notificationApi'
import { NotificationItem } from '../../ui/NotificationItem/NotificationItem'
import { toggleFeatures } from '@/shared/lib/features'
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton'

interface NotificationListProps {
    className?: string
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props
    const { data, isLoading } = useNotifications(null, {
        pollingInterval: 25000,
    })
    const cn = classNames('', {}, [className])

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    })

    if (isLoading) {
        return (
            <VStack gap="16" max className={cn}>
                <Skeleton width="100%" border="8px" height={50} />
                <Skeleton width="100%" border="8px" height={50} />
                <Skeleton width="100%" border="8px" height={50} />
            </VStack>
        )
    }

    return (
        <VStack gap="16" max className={cn}>
            {data?.map((item) => (
                <NotificationItem item={item} key={item.id} />
            ))}
        </VStack>
    )
})

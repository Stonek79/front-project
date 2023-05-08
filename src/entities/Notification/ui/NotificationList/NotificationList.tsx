import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useNotifications } from '../../api/notificationApi';
import { NotificationItem } from '../../ui/NotificationItem/NotificationItem';

interface NotificationListProps {
    className?: string
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props
    const { data, isLoading } = useNotifications(null, { pollingInterval: 25000 })
    const cn = classNames('', {}, [className])

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
            {data?.map((item) => <NotificationItem item={item} key={item.id} />)}
        </VStack>
    );
});

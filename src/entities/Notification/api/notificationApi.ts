import { rtkApi } from '@/shared/api/rtkApi'
import { Notifications } from '../model/types/notifications'

const notificationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notifications[], null>({
            query: () => ({
                url: '/notifications',
            }),
        }),
    }),
})

export const useNotifications = notificationsApi.useGetNotificationsQuery

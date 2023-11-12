import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstarage'

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: __API__,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '2'
            headers.set('Content-Type', 'application/json; charset=utf-8')
            return headers.set('Authorization', token ? `Bearer ${token}` : '')
        },
    }),
    endpoints: () => ({}),
})

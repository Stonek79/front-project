import axios from 'axios'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstarage'

export const $api = axios.create({
    baseURL: __API__,
})

$api.interceptors.request.use((config) => {
    if (config && config.headers) {
        config.headers.authorization =
            localStorage.getItem(USER_LOCALSTORAGE_KEY) || '2'
        config.headers['Content-Type'] = 'application/json; charset=utf-8'
    }
    return config
})

import { rtkApi } from '@/shared/api/rtkApi'
import { JsonSettings } from '../model/types/jsonSettings'
import { User } from '../model/types/user'

interface setJsonSettings {
    userId: string
    jsonSettings: JsonSettings
}

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        setJsonSettings: build.mutation<User, setJsonSettings>({
            query: ({ userId, jsonSettings }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    jsonSettings,
                },
            }),
        }),
        addUser: build.mutation<User, User>({
            query: (newUser) => ({
                url: `/users`,
                method: 'POST',
                body: newUser,
            }),
        }),
        getUserById: build.query<User, string>({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'GET',
            }),
        }),
    }),
})

export const setJsonSettingsMutation =
    userApi.endpoints.setJsonSettings.initiate

export const addUserMutation = userApi.endpoints.addUser.initiate

export const getUserDataByIdQuery = userApi.endpoints.getUserById.initiate

import { UserRoles } from '../consts/consts'

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles]

export interface User {
    id: string
    username: string
    avatar?: string
    roles?: UserRole[]
}

export interface UserSchema {
    authData?: User

    inited?: boolean
}

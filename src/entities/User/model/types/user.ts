import { UserRoles } from '../consts/consts'
import { FeatureFlags } from '@/shared/types/featureFlags'
import { JsonSettings } from './jsonSettings'

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles]

export interface User {
    id: string
    username: string
    password?: string
    avatar?: string
    features?: FeatureFlags
    roles?: UserRole[]
    jsonSettings?: JsonSettings
}

export interface UserSchema {
    authData?: User

    inited?: boolean
}

import { UserRoles } from '../consts/consts'
import { FeatureFlags } from '@/shared/types/featureFlags'

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles]

export interface User {
    id: string
    username: string
    avatar?: string
    features?: FeatureFlags
    roles?: UserRole[]
}

export interface UserSchema {
    authData?: User

    inited?: boolean
}

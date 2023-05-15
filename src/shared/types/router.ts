import { RouteProps } from 'react-router-dom'
// eslint-disable-next-line fsd-paths-checker-plugin/layer-import-control
import { UserRole } from '@/entities/User'

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean
    roles?: UserRole[]
}

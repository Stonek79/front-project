import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { getUserAuthData, getUserRoles } from 'entities/User'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { UserRole } from 'entities/User/model/types/user';
import { useMemo } from 'react';

export interface RequireAuthProps {
    children: JSX.Element
    roles?: UserRole[]
}
export const RequireAuth = ({ children, roles }: RequireAuthProps) => {
    const auth = useSelector(getUserAuthData);
    const location = useLocation();
    const userRoles = useSelector(getUserRoles)

    const hasPermit = useMemo(() => {
        if (!roles) {
            return true
        }
        return roles.some((role) => userRoles?.includes(role))
    }, [roles, userRoles])

    if (!auth) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }

    if (!hasPermit) {
        return <Navigate to={RoutePath.forbidden_page} state={{ from: location }} replace />;
    }

    return children;
}

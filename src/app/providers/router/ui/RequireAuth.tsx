import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useMemo } from 'react';
import { getUserAuthData, getUserRoles, UserRole } from '@/entities/User'
import { getRouteForbidden, getRouteMain } from '@/shared/const/router';

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
        return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
    }

    if (!hasPermit) {
        return <Navigate to={getRouteForbidden()} state={{ from: location }} replace />;
    }

    return children;
}

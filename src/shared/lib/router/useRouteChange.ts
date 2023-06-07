import { matchPath, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AppRouterByPathPattern, AppRoutes } from '@/shared/const/router'

export const useRouteChange = () => {
    const location = useLocation()
    const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN)

    useEffect(() => {
        Object.entries(AppRouterByPathPattern).forEach(([pattern, route]) => {
            if (matchPath(pattern, location.pathname)) {
                setAppRoute(route)
            }
        })
    }, [location.pathname])

    console.log(appRoute)
    return appRoute
}

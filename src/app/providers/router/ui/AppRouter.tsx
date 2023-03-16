import React, {
    memo, Suspense, useCallback,
} from 'react'
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps, routeConfig } from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';
import { RequireAuth } from 'app/providers/router/ui/RequireAuth'

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const { path, authOnly, element } = route
        const elem = (
            <Suspense fallback={<PageLoader />}>
                <div className="page-wrapper">
                    {element}
                </div>
            </Suspense>
        )

        return (
            <Route
                key={path}
                path={path}
                element={authOnly ? <RequireAuth>{elem}</RequireAuth> : elem}
            />
        )
    }, [])

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    )
}

export default memo(AppRouter);

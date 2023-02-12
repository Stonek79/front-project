import { Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import { routeConfig } from 'app/providers/router/config/routeConfig'
import { Spinner } from 'shared/ui/Spinner/Spinner'
import { BugButton } from 'app/providers/ErrorBoundaries'

export const AppRouter = () => (
    <div className="page">
        <Suspense fallback={<Spinner />}>
            {/* Тестовая кнопка */}
            <BugButton />
            <Routes>
                {routeConfig.map(({ path, element }) => (
                    <Route
                        key={path}
                        path={path}
                        element={element}
                    />
                ))}
            </Routes>
        </Suspense>
    </div>
)

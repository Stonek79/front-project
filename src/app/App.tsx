import React, { memo, Suspense, useEffect } from 'react'
import './styles/index.scss'
import { useSelector } from 'react-redux'
import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'
import { getUserInitData, initAuthData } from '@/entities/User'
import { AppRouter } from './providers/router'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { PageLoader } from '@/widgets/PageLoader'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ToggleComponentFeatures } from '@/shared/lib/features'
import { MainLayout } from '@/shared/layouts'
import { withTheme } from './providers/ThemeProvider/ui/withTheme'

const App = memo(() => {
    const { theme } = useTheme()
    const dispatch = useAppDispatch()
    const inited = useSelector(getUserInitData)

    const cn = classNames('app', {}, [theme])
    const cnRedesigned = classNames('app-redesigned', {}, [theme])

    useEffect(() => {
        dispatch(initAuthData())
    }, [dispatch])

    if (!inited) {
        return <PageLoader />
    }

    return (
        <ToggleComponentFeatures
            feature="isAppRedesigned"
            on={
                <div className={cnRedesigned}>
                    <Suspense fallback="">
                        <MainLayout
                            header={<Navbar />}
                            content={<AppRouter />}
                            sidebar={<Sidebar />}
                            /* eslint-disable-next-line i18next/no-literal-string */
                            toolbar={<div>fgbldjfb</div>}
                        />
                    </Suspense>
                </div>
            }
            off={
                <div className={cn}>
                    <Suspense fallback="">
                        <Navbar />
                        <div className="content-page">
                            <Sidebar />
                            {inited && <AppRouter />}
                        </div>
                    </Suspense>
                </div>
            }
        />
    )
})

export default withTheme(App)

import React, { memo, Suspense, useEffect } from 'react'
import './styles/index.scss'
import { useSelector } from 'react-redux'
import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'
import { getUserAuthData, getUserInitData, initAuthData } from '@/entities/User'
import { AppRouter } from './providers/router'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLoaderLayout, MainLayout } from '@/shared/layouts'
import { withTheme } from './providers/ThemeProvider/ui/withTheme'
import { useAppToolbar } from './lib/useAppToolbar'

const App = memo(() => {
    const { theme } = useTheme()
    const dispatch = useAppDispatch()
    const inited = useSelector(getUserInitData)
    const toolbar = useAppToolbar()

    useSelector(getUserAuthData)

    const cn = classNames('app-redesigned', {}, [theme])

    useEffect(() => {
        if (!inited) dispatch(initAuthData())
    }, [dispatch, inited])

    if (!inited) {
        return (
            <div id="app" className={cn}>
                <AppLoaderLayout />
            </div>
        )
    }

    return (
        <div id="app" className={cn}>
            <Suspense fallback={<AppLoaderLayout />}>
                <MainLayout
                    header={<Navbar />}
                    content={<AppRouter />}
                    sidebar={<Sidebar />}
                    toolbar={toolbar}
                />
            </Suspense>
        </div>
    )
})

export default withTheme(App)

import React, { Suspense, useEffect } from 'react'
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

function App() {
    const { theme } = useTheme()
    const dispatch = useAppDispatch()
    const inited = useSelector(getUserInitData)

    const cn = classNames('app', {}, [theme])
    useEffect(() => {
        dispatch(initAuthData())
    }, [dispatch])

    if (!inited) {
        return <PageLoader />
    }

    return (
        <div className={cn}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    )
}

export default App

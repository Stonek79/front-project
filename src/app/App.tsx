import React, { Suspense, useEffect } from 'react'
import './styles/index.scss'
import { AppRouter } from 'app/providers/router'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInitData, userActions } from 'entities/User'

function App() {
    const dispatch = useDispatch()
    const inited = useSelector(getUserInitData)

    useEffect(() => {
        dispatch(userActions.initAuthData())
    }, [dispatch])

    return (
        <div className="app">
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

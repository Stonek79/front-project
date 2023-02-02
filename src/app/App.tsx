import React, { Suspense } from 'react'
import './styles/index.scss'
import { Link, Route, Routes } from 'react-router-dom'
import { useTheme } from 'app/providers/ThemeProvider'
import { classNames } from 'shared/lib/classNames/classNames'
import { MainPageLazy } from 'pages/MainPage'
import { AboutPageLazy } from 'pages/AboutPage'


const App = () => {
    const { theme, toggleTheme } = useTheme()
    return (
        <div className={classNames('app', {}, [theme])}>
            <button onClick={toggleTheme}>THEME</button>
            <br/>
            <Link to={'/'}>Main</Link>
            <br/>
            <Link to={'/about'}>About us</Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path={'/'} element={<MainPageLazy/>}/>
                    <Route path={'/about'} element={<AboutPageLazy/>}/>
                </Routes>
            </Suspense>
        </div>
    )
}

export default App
import React, {Suspense, useContext, useState} from 'react';
import '../styles/index.scss'
import {Link, Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import AboutPage from "../pages/AboutPage/AboutPage";
import {MainPageLazy} from "../pages/MainPage/MainPage.lazy";
import {AboutPageLazy} from "../pages/AboutPage/AboutPage.lazy";
import {useTheme} from "../theme/useTheme";
import {classNames} from "../helpers/classNames/classNames";


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
    );
};

export default App;
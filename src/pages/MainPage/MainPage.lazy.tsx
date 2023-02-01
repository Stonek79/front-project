import {lazy} from "react";

export const MainPageLazy = lazy(() => new Promise(res => {
    // @ts-ignore
    setTimeout(() => res(import('./MainPage')), 1500)
}))
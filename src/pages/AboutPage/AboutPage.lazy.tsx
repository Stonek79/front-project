import {lazy} from "react";

export const AboutPageLazy = lazy(() => new Promise(res => {
    // @ts-ignore
    setTimeout(() => res(import('./AboutPage')), 1500)
}))

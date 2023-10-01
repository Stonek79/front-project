import { useState, useEffect } from 'react'

const SCREEN_SM = 576
const SCREEN_MD = 768
const SCREEN_LG = 992
const SCREEN_XL = 1200
const SCREEN_XXL = 1400

interface ResizeResult {
    width: number
    isScreenSm: boolean
    isScreenMd: boolean
    isScreenLg: boolean
    isScreenXl: boolean
    isScreenXxl: boolean
}

export const useResize = (): ResizeResult => {
    const [width, setWidth] = useState<number>(window.innerWidth)

    useEffect(() => {
        const handleResize = (event: WindowEventMap['resize']) => {
            const width = (event.target as Window)?.innerWidth
            setWidth(width)
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return {
        width,
        isScreenSm: width >= SCREEN_SM,
        isScreenMd: width >= SCREEN_MD,
        isScreenLg: width >= SCREEN_LG,
        isScreenXl: width >= SCREEN_XL,
        isScreenXxl: width >= SCREEN_XXL,
    }
}

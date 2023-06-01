import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from '@/shared/lib/context/ThemeContext'
import { Theme } from '@/shared/const/theme'

interface ThemeProviderProps {
    initialTheme?: Theme
    children: ReactNode
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const { children, initialTheme } = props

    const [theme, setTheme] = useState<Theme>(initialTheme || Theme.LIGHT)
    const [isThemeInited, setThemeInited] = useState(false)

    useEffect(() => {
        if (!isThemeInited && initialTheme) {
            setTheme(initialTheme)
            setThemeInited(true)
        }
    }, [initialTheme, isThemeInited])

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    )

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider

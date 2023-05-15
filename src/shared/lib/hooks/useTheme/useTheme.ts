import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstarage'
import { Theme, themes } from '@/shared/const/theme'

interface UseThemeResult {
    toggleTheme: () => void
    theme: Theme
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleTheme = () => {
        const newTheme: Theme = themes[theme]

        setTheme?.(newTheme)
        document.body.className = newTheme
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
    }

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    }
}

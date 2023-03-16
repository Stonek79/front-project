import { useContext } from 'react'
import {
    LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext, themes,
} from './ThemeContext'

interface UseThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme: Theme = themes[theme]

        setTheme?.(newTheme);
        document.body.className = newTheme
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    };
}

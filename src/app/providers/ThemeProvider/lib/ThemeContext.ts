import { createContext } from 'react';

export enum Theme {
    LIGHT = 'app_light_theme',
    DARK = 'app_dark_theme',
    LILAC = 'app_lilac_theme'
}

export interface ThemeContextProps {
    theme: Theme;
    setTheme?: (theme: Theme) => void;
}

export const themes = {
    [Theme.DARK]: Theme.LIGHT,
    [Theme.LIGHT]: Theme.LILAC,
    [Theme.LILAC]: Theme.DARK,
}

export const ThemeContext = createContext<ThemeContextProps>({ theme: Theme.LIGHT });

export const LOCAL_STORAGE_THEME_KEY = 'theme';

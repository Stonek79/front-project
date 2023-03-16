import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react'
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import LilacIcon from 'shared/assets/icons/theme-lilac.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

interface ThemeSwitcherProps {
    className?: string;
}

const themes = {
    [Theme.DARK]: <DarkIcon />,
    [Theme.LIGHT]: <LightIcon />,
    [Theme.LILAC]: <LilacIcon />,
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const { className } = props
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
        >
            {themes[theme]}
        </Button>
    );
});

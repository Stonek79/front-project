import { classNames } from 'shared/lib/classNames/classNames'
import { FC } from 'react'
import { Theme, useTheme } from 'app/providers/ThemeProvider'
import DerkIcon from 'shared/assets/icons/theme-dark.svg'
import LightIcon from 'shared/assets/icons/theme-light.svg'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = (props) => {
    const { theme, toggleTheme } = useTheme()

    const { className } = props

    const cn = classNames('', [className])

    return (
        <Button theme={ButtonTheme.CLEAR} className={cn} onClick={toggleTheme}>
            {theme === Theme.DARK ? <DerkIcon /> : <LightIcon />}
        </Button>
    )
}

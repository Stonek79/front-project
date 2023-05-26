import React, { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import LightIcon from '@/shared/assets/icons/theme-light.svg'
import DarkIcon from '@/shared/assets/icons/theme-dark.svg'
import LilacIcon from '@/shared/assets/icons/theme-lilac.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { Theme } from '@/shared/const/theme'
import { saveJsonSettings } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

interface ThemeSwitcherProps {
    className?: string
}

const themes = {
    [Theme.DARK]: <DarkIcon />,
    [Theme.LIGHT]: <LightIcon />,
    [Theme.LILAC]: <LilacIcon />,
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const { className } = props
    const { theme, toggleTheme } = useTheme()
    const dispatch = useAppDispatch()

    const toggleThemeHandler = useCallback(() => {
        toggleTheme((newTheme) =>
            dispatch(saveJsonSettings({ theme: newTheme })),
        )
    }, [dispatch, toggleTheme])

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames('', {}, [className])}
            onClick={toggleThemeHandler}
        >
            {themes[theme]}
        </Button>
    )
})

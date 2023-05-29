import React, { memo, useCallback } from 'react'
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import { classNames } from '@/shared/lib/classNames/classNames'
import ThemeIconDeprecated from '@/shared/assets/icons/theme-light.svg'
import ThemeIcon from '@/shared/assets/icons/theme.svg'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { saveJsonSettings } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { ToggleComponentFeatures } from '@/shared/lib/features'
import { Icon } from '@/shared/ui/redesigned/Icon'

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const { className } = props
    const { toggleTheme } = useTheme()
    const dispatch = useAppDispatch()

    const toggleThemeHandler = useCallback(() => {
        toggleTheme((newTheme) =>
            dispatch(saveJsonSettings({ theme: newTheme })),
        )
    }, [dispatch, toggleTheme])

    return (
        <ToggleComponentFeatures
            feature="isAppRedesigned"
            on={<Icon Svg={ThemeIcon} clickable onClick={toggleThemeHandler} />}
            off={
                <ButtonDeprecated
                    theme={ButtonTheme.CLEAR}
                    className={classNames('', {}, [className])}
                    onClick={toggleThemeHandler}
                >
                    <IconDeprecated
                        Svg={ThemeIconDeprecated}
                        width={40}
                        height={40}
                        inverted
                    />
                </ButtonDeprecated>
            }
        />
    )
})

import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button'
import { ToggleComponentFeatures } from '@/shared/lib/features'
import { Button } from '@/shared/ui/redesigned/Button'

interface LangSwitcherProps {
    className?: string
    short?: boolean
}

export const LangSwitcher = memo((props: LangSwitcherProps) => {
    const { className, short } = props
    const { t, i18n } = useTranslation()
    const toggle = async () => {
        await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }

    return (
        <ToggleComponentFeatures
            feature="isAppRedesigned"
            on={
                <Button onClick={toggle} variant="clear">
                    <div>{short ? t('short-lng') : t('Language')}</div>
                </Button>
            }
            off={
                <ButtonDeprecated
                    className={classNames('', {}, [className])}
                    theme={ButtonTheme.BG_INVERTED}
                    onClick={toggle}
                >
                    {short ? t('short-lng') : t('Language')}
                </ButtonDeprecated>
            }
        />
    )
})

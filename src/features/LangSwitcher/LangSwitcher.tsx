import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'

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
        <Button onClick={toggle} variant="clear">
            <div className={className}>
                {short ? t('short-lng') : t('Language')}
            </div>
        </Button>
    )
})

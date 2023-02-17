import { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher: FC<LangSwitcherProps> = (props) => {
    const { t, i18n } = useTranslation()
    const { className } = props

    const cn = classNames('', [className])
    const switcher = async () => {
        await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }

    return (
        <Button
            theme={ButtonTheme.SECONDARY}
            className={cn}
            onClick={switcher}
        >
            {t('language')}
        </Button>
    );
};

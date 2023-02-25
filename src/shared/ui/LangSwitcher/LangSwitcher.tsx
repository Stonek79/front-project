import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = ({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = async () => {
        await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    const btnName = short ? 'short-lng' : 'Язык'

    return (
        <Button
            className={classNames('', {}, [className])}
            theme={ButtonTheme.BG_INVERTED}
            onClick={toggle}
        >
            {t(btnName)}
        </Button>
    );
};

import { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { RoutePath } from 'shared/config/routePaths'
import cls from './ErrorPage.module.scss'

interface ErrorPageProps {
    className?: string;
}

export const ErrorPage: FC<ErrorPageProps> = (props) => {
    const { t } = useTranslation()
    const { className } = props
    const cn = classNames(cls.ErrorPage, [className])

    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    const toMain = () => {
        // eslint-disable-next-line no-restricted-globals
        location.replace(RoutePath.main)
    }

    return (
        <div className={cn}>
            <p>{t('errorMessage')}</p>
            <br />
            <Button theme={ButtonTheme.LIGHT} className={cls.btn} onClick={reloadPage}>
                {t('reloadPage')}
            </Button>
            <br />
            <Button theme={ButtonTheme.LIGHT} className={cls.btn} onClick={toMain}>
                {t('toMainPage')}
            </Button>
        </div>
    );
};

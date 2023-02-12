import { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import cls from './NotFoundPage.module.scss'

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage: FC<NotFoundPageProps> = (props) => {
    const { t } = useTranslation()
    const { className } = props
    const cn = classNames(cls.NotFoundPage, [className])

    return (
        <div className={cn}>{t('notFoundPage')}</div>
    );
};

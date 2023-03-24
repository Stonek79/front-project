import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared/ui/Page/Page'
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
    const { t } = useTranslation();
    const cn = classNames(cls.NotFoundPage, {}, [className])
    return (
        <Page className={cn}>
            {t('Страница не найдена')}
        </Page>
    );
};

import { useTranslation } from 'react-i18next'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'
import cls from './ErrorPage.module.scss'

interface ErrorPageProps {
    className?: string
}

export const ErrorPage = ({ className }: ErrorPageProps) => {
    const { t } = useTranslation()

    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload()
    }

    return (
        <Page
            data-testid="ErrorPage"
            className={classNames(cls.ErrorPage, {}, [className])}
        >
            <p>{t('Unexpected error')}</p>
            <Button theme={ButtonTheme.BG_INVERTED} onClick={reloadPage}>
                {t('Reload page')}
            </Button>
        </Page>
    )
}

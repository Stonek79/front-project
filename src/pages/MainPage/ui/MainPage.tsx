import { useTranslation } from 'react-i18next'
import { Page } from 'widgets/Page/ui/Page/Page'
import { memo } from 'react'

const MainPage = () => {
    const { t } = useTranslation()

    return (
        <Page>
            {t('Главная страница')}
        </Page>
    )
}

export default memo(MainPage)

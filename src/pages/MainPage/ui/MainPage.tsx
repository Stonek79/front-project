import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { Page } from '@/widgets/Page/ui/Page/Page'

const MainPage = () => {
    const { t } = useTranslation()

    return (
        <Page>
            {t('Главная страница')}
        </Page>
    )
}

export default memo(MainPage)

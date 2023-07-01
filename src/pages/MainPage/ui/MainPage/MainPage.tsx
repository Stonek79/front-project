import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { Page } from '@/widgets/Page'
import { MainPageGreating } from '@/widgets/MainPageGreating'

const MainPage = () => {
    const { t } = useTranslation()

    return (
        <Page data-testid="MainPage">
            {/* <VStack align="center" gap="8" max> */}
            {/* <Text text={t('The page is in development')} /> */}
            <MainPageGreating />
            {/* </VStack> */}
        </Page>
    )
}
export default memo(MainPage)

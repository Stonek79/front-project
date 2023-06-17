import React from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'

const AboutPage = () => {
    const { t } = useTranslation()

    return (
        <Page data-testid="AboutPage">
            <VStack gap="16" justify="center" align="center">
                <Text bold text={t('About Page')} />
                <Text text={t('The page is in development')} />
            </VStack>
        </Page>
    )
}

export default AboutPage

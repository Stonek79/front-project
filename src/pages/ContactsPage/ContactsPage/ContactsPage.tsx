import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import { Text } from '@/shared/ui/redesigned/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { MainBlock, AddressBlock } from '@/features/Contacts'

const ContactsPage = () => {
    const { t } = useTranslation()

    return (
        <Page data-testid="ContactsPage">
            <VStack gap="32">
                <Text
                    title={t('Contacts page')}
                    text={t('The page is in development')}
                />
                <MainBlock />
                <AddressBlock />
            </VStack>
        </Page>
    )
}

export default ContactsPage

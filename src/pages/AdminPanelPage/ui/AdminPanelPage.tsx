import React from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import { Text } from '@/shared/ui/redesigned/Text'

const AdminPanelPage = () => {
    const { t } = useTranslation()

    return (
        <Page data-testid="AdminPanelPage">
            <Text
                title={t('Admin page panel')}
                text={t('The page is in development')}
            />
        </Page>
    )
}

export default AdminPanelPage

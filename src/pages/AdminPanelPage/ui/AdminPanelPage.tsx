import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page/ui/Page/Page'

const AdminPanelPage = () => {
    const { t } = useTranslation();

    return (
        <Page>
            {t('Admin page panel')}
        </Page>
    );
};

export default AdminPanelPage;

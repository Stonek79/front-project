import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page'

const ForbiddenPage = () => {
    const { t } = useTranslation();

    return (
        <Page>
            {t('Access not allowed')}
        </Page>
    );
};

export default ForbiddenPage;

import { Story } from '@storybook/react'
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'shared/config/i18next/i18n'
import { Spinner } from 'shared/ui/Spinner/Spinner'

export const i18nDecorator = (StoryComponent: Story) => (
    <Suspense fallback={<Spinner />}>
        <I18nextProvider i18n={i18n}>
            <StoryComponent />
        </I18nextProvider>
    </Suspense>
)

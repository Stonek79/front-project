import { I18nextProvider } from 'react-i18next'
import { Suspense } from 'react'
import { Story } from '@storybook/react'
import i18n from 'shared/config/i18n/i18n'

export const i18nDecorator = (StoryComponent: Story) => (
    <I18nextProvider i18n={i18n}>
        <Suspense fallback="">
            <StoryComponent />
        </Suspense>
    </I18nextProvider>
)

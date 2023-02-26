import { I18nextProvider } from 'react-i18next'
import { Suspense } from 'react'
import { Story } from '@storybook/react'
import i18n from 'shared/config/i18n/i18n'

export const i18nDecorator = (StoryComponent: Story) => (
    <Suspense fallback="">
        <I18nextProvider i18n={i18n}>
            <StoryComponent />
        </I18nextProvider>
    </Suspense>
)

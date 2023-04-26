import { I18nextProvider } from 'react-i18next'
import { Story } from '@storybook/react'
import { Suspense } from 'react'
import { Loader } from '@/shared/ui/Loader/Loader'
import i18n from '../../i18n/i18n'

export const i18nDecorator = (StoryComponent: Story) => (
    <Suspense fallback={<Loader />}>
        <I18nextProvider i18n={i18n}>
            <StoryComponent />
        </I18nextProvider>
    </Suspense>
)

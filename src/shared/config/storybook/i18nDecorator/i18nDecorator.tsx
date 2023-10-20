import { I18nextProvider } from 'react-i18next'
import { Story } from '@storybook/react'
import { Suspense } from 'react'
import i18n from '../../i18n/i18n'
import { Loader } from '@/shared/ui/redesigned/Loader'

export const i18nDecorator = (StoryComponent: Story) => (
    <Suspense fallback={<Loader />}>
        <I18nextProvider i18n={i18n}>
            <StoryComponent />
        </I18nextProvider>
    </Suspense>
)

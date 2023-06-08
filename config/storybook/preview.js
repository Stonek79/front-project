import { addDecorator } from '@storybook/react'
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator'
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator'
import { i18nDecorator } from '../../src/shared/config/storybook/i18nDecorator/i18nDecorator'
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator'
import { Theme } from '../../src/shared/const/theme'
import { FeatureFlagDecorator } from '@/shared/config/storybook/FeatureFlagDecorator/FeatureFlagDecorator'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    themes: {
        default: 'light',
        list: [
            { name: 'light', class: Theme.LIGHT, color: '#e8e8ea' },
            { name: 'dark', class: Theme.DARK, color: '#090949' },
            { name: 'lilac', class: Theme.LILAC, color: '#7566c1' },
        ],
    },
}

addDecorator(ThemeDecorator(Theme.LIGHT))
addDecorator(StyleDecorator)
addDecorator(RouterDecorator)
addDecorator(i18nDecorator)
addDecorator(SuspenseDecorator)
addDecorator(FeatureFlagDecorator({}))

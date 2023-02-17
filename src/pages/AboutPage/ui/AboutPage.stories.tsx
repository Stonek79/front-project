import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import AboutPage from './AboutPage'

export default {
    title: 'pages/AboutPage',
    component: AboutPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },

} as ComponentMeta<typeof AboutPage>

const Template: ComponentStory<typeof AboutPage> = () => <AboutPage />

export const DarkThemePrimary = Template.bind({})
DarkThemePrimary.args = {
}
DarkThemePrimary.decorators = [ThemeDecorator(Theme.DARK)]

export const LightThemePrimary = Template.bind({})
LightThemePrimary.args = {
}

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { NotFoundPage } from './NotFoundPage'

export default {
    title: 'pages/NotFoundPage',
    component: NotFoundPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },

} as ComponentMeta<typeof NotFoundPage>

const Template: ComponentStory<typeof NotFoundPage> = () => <NotFoundPage />

export const DarkThemePrimary = Template.bind({})
DarkThemePrimary.args = {
}
DarkThemePrimary.decorators = [ThemeDecorator(Theme.DARK)]

export const LightThemePrimary = Template.bind({})
LightThemePrimary.args = {
}

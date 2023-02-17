import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { ErrorPage } from './ErrorPage'

export default {
    title: 'widget/ErrorPage',
    component: ErrorPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ErrorPage>

const Template: ComponentStory<typeof ErrorPage> = (args) => <ErrorPage {...args} />

export const DarkTheme = Template.bind({})
DarkTheme.args = {
}
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)]

export const LightTheme = Template.bind({})
LightTheme.args = {
}

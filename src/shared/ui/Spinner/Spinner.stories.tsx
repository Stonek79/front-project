import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Spinner } from 'shared/ui/Spinner/Spinner'

export default {
    title: 'shared/Spinner',
    component: Spinner,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Spinner>

const Template: ComponentStory<typeof Spinner> = () => <Spinner />

export const DarkTheme = Template.bind({})
DarkTheme.args = {
}
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)]

export const LightTheme = Template.bind({})
LightTheme.args = {
}

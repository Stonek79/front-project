import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Button, ButtonTheme } from './Button'

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Clear = Template.bind({})
Clear.args = {
    children: 'BUTTON',
}
Clear.decorators = [ThemeDecorator(Theme.DARK)]

export const Secondary = Template.bind({})
Secondary.args = {
    children: 'BUTTON',
    theme: ButtonTheme.SECONDARY,
}
Secondary.decorators = [ThemeDecorator(Theme.DARK)]

export const ClearLight = Template.bind({})
ClearLight.args = {
    children: 'BUTTON',
}

export const SecondaryLight = Template.bind({})
SecondaryLight.args = {
    children: 'BUTTON',
    theme: ButtonTheme.SECONDARY,
}

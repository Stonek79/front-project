import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { AppLink, AppLinkTheme } from './AppLink'

export default {
    title: 'shared/AppLink',
    component: AppLink,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof AppLink>

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />

export const DarkThemePrimary = Template.bind({})
DarkThemePrimary.args = {
    children: 'TEXT',
    theme: AppLinkTheme.PRIMARY,
}
DarkThemePrimary.decorators = [ThemeDecorator(Theme.DARK)]

export const LightThemePrimary = Template.bind({})
LightThemePrimary.args = {
    children: 'TEXT',
    theme: AppLinkTheme.PRIMARY,
}

export const DarkThemeSecondary = Template.bind({})
DarkThemeSecondary.args = {
    children: 'TEXT',
    theme: AppLinkTheme.SECONDARY,
}
DarkThemeSecondary.decorators = [ThemeDecorator(Theme.DARK)]

export const LightThemeSecondary = Template.bind({})
LightThemeSecondary.args = {
    children: 'TEXT',
    theme: AppLinkTheme.SECONDARY,
}

export const DarkThemeRed = Template.bind({})
DarkThemeRed.args = {
    children: 'TEXT',
    theme: AppLinkTheme.RED,
}
DarkThemeRed.decorators = [ThemeDecorator(Theme.DARK)]

export const LightThemeRed = Template.bind({})
LightThemeRed.args = {
    children: 'TEXT',
    theme: AppLinkTheme.RED,
}

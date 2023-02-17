import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { SidebarLayout } from './SidebarLayout'

export default {
    title: 'widget/SidebarLayout',
    component: SidebarLayout,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SidebarLayout>

const Template: ComponentStory<typeof SidebarLayout> = (args) => <SidebarLayout {...args} />

export const DarkTheme = Template.bind({})
DarkTheme.args = {
}
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)]

export const LightTheme = Template.bind({})
LightTheme.args = {
}

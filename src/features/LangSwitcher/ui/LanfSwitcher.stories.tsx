import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { LangSwitcher } from './LangSwitcher'

export default {
    title: 'features/LangSwitcher',
    component: LangSwitcher,
    argTypes: {
        backgroundColor: { control: 'color' },
    },

} as ComponentMeta<typeof LangSwitcher>

const Template: ComponentStory<typeof LangSwitcher> = (args) => <LangSwitcher {...args} />

export const DarkThemePrimary = Template.bind({})
DarkThemePrimary.args = {
}
DarkThemePrimary.decorators = [ThemeDecorator(Theme.DARK)]

export const LightThemePrimary = Template.bind({})
LightThemePrimary.args = {
}

import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Tabs } from './Tabs'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'shared/Tabs',
    component: Tabs,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Tabs>

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />

export const Normal = Template.bind({})
Normal.args = {
    tabs: [
        {
            value: 'value 1',
            content: 'content 1',
        },
        {
            value: 'value 2',
            content: 'content 2',
        },
        {
            value: 'value 3',
            content: 'content 3',
        },
    ],
    value: 'value 3',
    onTabClick: action('onTabClick'),
}

export const NormalDark = Template.bind({})
NormalDark.args = {
    tabs: [
        {
            value: 'value 1',
            content: 'content 1',
        },
        {
            value: 'value 2',
            content: 'content 2',
        },
        {
            value: 'value 3',
            content: 'content 3',
        },
    ],
    value: 'value 3',
    onTabClick: action('onTabClick'),
}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

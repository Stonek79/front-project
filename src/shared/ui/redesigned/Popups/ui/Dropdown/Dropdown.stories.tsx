import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Dropdown } from './Dropdown'
import { Button } from '../../../Button/Button'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'shared/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Dropdown>

const Template: ComponentStory<typeof Dropdown> = (args) => (
    <Dropdown {...args} />
)

export const Normal = Template.bind({})
Normal.args = {
    trigger: <Button>Open</Button>,
    direction: 'top left',
    items: [
        {
            content: 'content 1',
        },
        {
            content: 'content 2',
        },
        {
            content: 'content 3',
        },
    ],
}

export const NormalDark = Template.bind({})
NormalDark.args = {
    trigger: <Button>Open</Button>,
    direction: 'top left',
    items: [
        {
            content: 'content 1',
        },
        {
            content: 'content 2',
        },
        {
            content: 'content 3',
        },
    ],
}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Input } from './Input'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'shared/Input',
    component: Input,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const Normal = Template.bind({})
Normal.args = {
    placeholder: 'Enter text',
    value: 'text string',
}

export const Dark = Template.bind({})
Dark.args = {
    placeholder: 'Enter text',
    value: 'text string',
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

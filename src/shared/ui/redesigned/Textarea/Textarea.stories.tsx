import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Textarea } from './Textarea'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'shared/Textarea',
    component: Textarea,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof Textarea>

const Template: ComponentStory<typeof Textarea> = (args) => (
    <Textarea {...args} />
)

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

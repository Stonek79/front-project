import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Text } from '../Text/Text'
import { Card } from './Card'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'shared/Card',
    component: Card,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />

export const Normal = Template.bind({})
Normal.args = {
    children: <Text title="Title text" text="some text" />,
}

export const NormalDark = Template.bind({})
NormalDark.args = {
    children: <Text title="Title text" text="some text" />,
}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

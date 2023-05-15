import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { NotificationItem } from './NotificationItem'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'entities/NotificationItem',
    component: NotificationItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationItem>

const Template: ComponentStory<typeof NotificationItem> = (args) => (
    <NotificationItem {...args} />
)

export const Normal = Template.bind({})
Normal.args = {
    item: {
        id: 1,
        title: 'Задача назначена',
        description: 'Вакансия «React Native Developer» откликнена',
    },
}

export const NormalDark = Template.bind({})
NormalDark.args = {
    item: {
        id: 1,
        title: 'Задача назначена',
        description: 'Вакансия «React Native Developer» откликнена',
    },
}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

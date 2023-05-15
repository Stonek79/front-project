import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { NotificationList } from './NotificationList'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'entities/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
    parameters: {
        mockData: [
            {
                url: `${__API__}/notifications`,
                method: 'GET',
                status: 200,
                response: [
                    {
                        id: '1',
                        title: 'Задача назначена',
                        description:
                            'Вакансия «React Native Developer» откликнена',
                    },
                    {
                        id: '2',
                        title: 'Задача назначена',
                        description:
                            'Вакансия «React Native Developer» откликнена',
                    },
                    {
                        id: '3',
                        title: 'Задача назначена',
                        description:
                            'Вакансия «React Native Developer» откликнена',
                    },
                ],
            },
        ],
    },
} as ComponentMeta<typeof NotificationList>

const Template: ComponentStory<typeof NotificationList> = (args) => (
    <NotificationList {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}

export const NormalDark = Template.bind({})
NormalDark.args = {}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

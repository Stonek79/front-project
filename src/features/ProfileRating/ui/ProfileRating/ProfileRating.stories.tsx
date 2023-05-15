import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import ProfileRating from './ProfileRating'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'features/ProfileRating',
    component: ProfileRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ProfileRating>

const Template: ComponentStory<typeof ProfileRating> = (args) => (
    <ProfileRating {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}
Normal.parameters = {
    mockData: [
        {
            url: `${__API__}/profile-ratings?userId=1`,
            method: 'GET',
            status: 200,
            response: [],
        },
    ],
}

export const NormalDark = Template.bind({})
NormalDark.args = {}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]
NormalDark.parameters = {
    mockData: [
        {
            url: `${__API__}/profile-ratings?userId=1`,
            method: 'GET',
            status: 200,
            response: [],
        },
    ],
}

export const Normal4Stars = Template.bind({})
Normal4Stars.args = {
    userId: '1',
}
Normal4Stars.parameters = {
    mockData: [
        {
            url: `${__API__}/profile-ratings?userId=1`,
            method: 'GET',
            status: 200,
            response: [
                {
                    id: '1',
                    starRate: 4,
                    feedback: 'Fucking good dude',
                    userId: '1',
                },
            ],
        },
    ],
}

export const NormalDark4Stars = Template.bind({})
NormalDark4Stars.args = {
    userId: '1',
}
NormalDark4Stars.decorators = [ThemeDecorator(Theme.DARK)]
NormalDark4Stars.parameters = {
    mockData: [
        {
            url: `${__API__}/profile-ratings?userId=1`,
            method: 'GET',
            status: 200,
            response: [
                {
                    id: '1',
                    starRate: 4,
                    feedback: 'Fucking good dude',
                    userId: '1',
                },
            ],
        },
    ],
}

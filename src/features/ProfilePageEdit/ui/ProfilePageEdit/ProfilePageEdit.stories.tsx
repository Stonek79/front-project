import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { Currency } from '@/entities/Currency'
import { Countries } from '@/entities/Country'
import AvatarImg from '@/shared/assets/avatar.jpg'
import { ProfilePageEdit } from './ProfilePageEdit'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'features/ProfilePageEdit',
    component: ProfilePageEdit,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        StoreDecorator({
            profile: {
                data: {
                    firstname: 'Alex',
                    lastname: 'Smith',
                    age: '42',
                    currency: Currency.RUB,
                    country: Countries.Russia,
                    city: 'Moscow',
                    username: 'StoneK',
                    avatar: AvatarImg,
                },
                form: {
                    firstname: 'Alex',
                    lastname: 'Smith',
                    age: '42',
                    currency: Currency.RUB,
                    country: Countries.Russia,
                    city: 'Moscow',
                    username: 'StoneK',
                    avatar: AvatarImg,
                },
            },
        }),
    ],
} as ComponentMeta<typeof ProfilePageEdit>

const Template: ComponentStory<typeof ProfilePageEdit> = (args) => (
    <ProfilePageEdit {...args} />
)

export const Normal = Template.bind({})
Normal.args = {
    id: '1',
}

export const NormalDark = Template.bind({})
NormalDark.args = {
    id: '1',
}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

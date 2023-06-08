import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { Currency } from '@/entities/Currency'
import { Countries } from '@/entities/Country'
import { ProfileCardRedesigned } from './ProfileCardRedesigned'
import AvatarImg from '../../../../shared/assets/avatar.jpg'
import { Theme } from '@/shared/const/theme'
import { FeatureFlagDecorator } from '@/shared/config/storybook/FeatureFlagDecorator/FeatureFlagDecorator'

const data = {
    firstname: 'Alex',
    lastname: 'Smith',
    age: '42',
    currency: Currency.RUB,
    country: Countries.Russia,
    city: 'Moscow',
    username: 'StoneK',
    avatar: AvatarImg,
}

export default {
    title: 'entities/ProfileCardRedesigned',
    component: ProfileCardRedesigned,
    decorators: [FeatureFlagDecorator({ isAppRedesigned: true })],
} as ComponentMeta<typeof ProfileCardRedesigned>

const Template: ComponentStory<typeof ProfileCardRedesigned> = (args) => (
    <ProfileCardRedesigned {...args} />
)

export const Readonly = Template.bind({})
Readonly.args = {
    readonly: true,
    isLoading: false,
    data,
}

export const ReadonlyDark = Template.bind({})
ReadonlyDark.args = {
    readonly: true,
    isLoading: false,
    data,
}
ReadonlyDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Loading = Template.bind({})
Loading.args = {
    isLoading: true,
}

export const Success = Template.bind({})
Success.args = {
    readonly: false,
    isLoading: false,
    data,
}
Success.decorators = [
    StoreDecorator({
        user: {
            authData: {},
        },
    }),
]

export const SuccessDark = Template.bind({})
SuccessDark.args = {
    readonly: false,
    isLoading: false,
    data,
}
SuccessDark.decorators = [ThemeDecorator(Theme.DARK)]

import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { Currency } from '@/entities/Currency'
import { Countries } from '@/entities/Country'
import { ValidateProfileErrors } from '@/entities/Profile'
import ProfilePage from './ProfilePage'
import AvatarImg from '../../../shared/assets/avatar.jpg'
import { Theme } from '@/shared/const/theme'

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

const errors = {
    firstname: [ValidateProfileErrors.REQUIRED],
    lastname: [ValidateProfileErrors.INCORRECT_LENGTH],
    age: [ValidateProfileErrors.INCORRECT_AGE],
    city: [ValidateProfileErrors.REQUIRED],
    username: [ValidateProfileErrors.INCORRECT_LENGTH],
    currency: [],
    country: [],
    data: [],
}

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    parameters: {
        mockData: [
            {
                url: `${__API__}/profile-ratings?userId=1`,
                method: 'GET',
                status: 200,
                response: [],
            },
        ],
    },
} as ComponentMeta<typeof ProfilePage>

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [
    StoreDecorator({
        profile: {
            form: data,
        },
    }),
]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: {
            form: data,
        },
    }),
]

export const DarkReadonly = Template.bind({})
DarkReadonly.args = {}
DarkReadonly.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: {
            readonly: true,
            form: data,
        },
    }),
]

export const DarkLoading = Template.bind({})
DarkLoading.args = {}
DarkLoading.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: {
            readonly: true,
            isLoading: true,
        },
    }),
]

export const DarkValidateErrors = Template.bind({})
DarkValidateErrors.args = {}
DarkValidateErrors.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: {
            form: {
                ...data,
                firstname: undefined,
                lastname: undefined,
                age: '424',
                city: undefined,
                username: 'St',
            },
            validateErrors: errors,
        },
    }),
]

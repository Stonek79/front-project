import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import LoginForm from './LoginForm'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/common',
    },
} as ComponentMeta<typeof LoginForm>

const Template: ComponentStory<typeof LoginForm> = (args) => (
    <LoginForm {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [
    StoreDecorator({
        loginForm: {
            username: 'User',
            password: 'pass123',
            isLoading: false,
        },
    }),
]

export const Error = Template.bind({})
Error.args = {}
Error.decorators = [
    StoreDecorator({
        loginForm: {
            username: 'User',
            password: 'pass123',
            error: 'Log in error',
            isLoading: false,
        },
    }),
]

export const Loading = Template.bind({})
Loading.args = {}
Loading.decorators = [
    StoreDecorator({
        loginForm: {
            username: 'User',
            password: 'pass123',
            isLoading: true,
        },
    }),
]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        loginForm: {
            username: 'User',
            password: 'pass123',
            isLoading: false,
        },
    }),
]

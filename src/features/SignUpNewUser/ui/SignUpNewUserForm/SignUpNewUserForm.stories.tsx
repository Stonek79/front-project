import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import SignUpNewUserForm from './SignUpNewUserForm'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'features/SignUpNewUserForm',
    component: SignUpNewUserForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SignUpNewUserForm>

const Template: ComponentStory<typeof SignUpNewUserForm> = (args) => (
    <SignUpNewUserForm {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}

export const NormalDark = Template.bind({})
NormalDark.args = {}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

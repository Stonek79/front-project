import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import ConfirmationModalForm from './ConfirmationModalForm'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'features/ConfirmationModalForm',
    component: ConfirmationModalForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ConfirmationModalForm>

const Template: ComponentStory<typeof ConfirmationModalForm> = (args) => (
    <ConfirmationModalForm {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}

export const NormalDark = Template.bind({})
NormalDark.args = {}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

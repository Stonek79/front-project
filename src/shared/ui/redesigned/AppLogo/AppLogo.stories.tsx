import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { AppLogo } from './AppLogo'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'shared/AppLogo',
    component: AppLogo,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AppLogo>

const Template: ComponentStory<typeof AppLogo> = (args) => <AppLogo {...args} />

export const Normal = Template.bind({})
Normal.args = {}

export const NormalDark = Template.bind({})
NormalDark.args = {}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

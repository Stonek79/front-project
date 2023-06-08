import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { MainLayout } from './MainLayout'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'shared/MainLayout',
    component: MainLayout,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MainLayout>

const Template: ComponentStory<typeof MainLayout> = (args) => (
    <MainLayout {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}

export const NormalDark = Template.bind({})
NormalDark.args = {}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

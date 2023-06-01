import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { Sidebar } from './Sidebar'
import { Theme } from '@/shared/const/theme'
import { FeatureFlagDecorator } from '@/shared/config/storybook/FeatureFlagDecorator/FeatureFlagDecorator'

export default {
    title: 'widgets/Sidebar',
    component: Sidebar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [(story) => <div style={{ height: '100vh' }}>{story()}</div>],
} as ComponentMeta<typeof Sidebar>

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />

export const Light = Template.bind({})
Light.args = {}
Light.decorators = [
    StoreDecorator({
        user: {
            authData: {},
        },
    }),
]

export const LightRedesigned = Template.bind({})
LightRedesigned.args = {}
LightRedesigned.decorators = [
    StoreDecorator({
        user: {
            authData: {},
        },
    }),
    FeatureFlagDecorator({ isAppRedesigned: true }),
]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        user: {
            authData: {},
        },
    }),
]

export const Unauthorized = Template.bind({})
Unauthorized.args = {}
Unauthorized.decorators = [
    StoreDecorator({
        user: {},
    }),
]

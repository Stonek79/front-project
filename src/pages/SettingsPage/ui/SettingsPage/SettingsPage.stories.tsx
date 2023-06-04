import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import SettingsPage from './SettingsPage'

export default {
    title: 'pages/SettingsPage',
    component: SettingsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SettingsPage>

const Template: ComponentStory<typeof SettingsPage> = (args) => (
    <SettingsPage {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}

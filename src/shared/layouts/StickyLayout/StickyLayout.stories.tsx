import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { StickyLayout } from './StickyLayout'

export default {
    title: 'shared/StickyLayout',
    component: StickyLayout,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof StickyLayout>

const Template: ComponentStory<typeof StickyLayout> = (args) => (
    <StickyLayout {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}

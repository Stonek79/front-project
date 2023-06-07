import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ScrollToTopButton } from './ScrollToTopButton'

export default {
    title: 'features/ScrollToTopButton',
    component: ScrollToTopButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ScrollToTopButton>

const Template: ComponentStory<typeof ScrollToTopButton> = (args) => (
    <ScrollToTopButton {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}

import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ArticlesFilters } from './ArticlesFilters'

export default {
    title: 'widgets/ArticlesFilters',
    component: ArticlesFilters,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesFilters>

const Template: ComponentStory<typeof ArticlesFilters> = (args) => (
    <ArticlesFilters {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}

export const NormalDark = Template.bind({})
NormalDark.args = {}

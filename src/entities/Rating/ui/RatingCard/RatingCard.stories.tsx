import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { RatingCard } from './RatingCard'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'entities/RatingCard',
    component: RatingCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof RatingCard>

const Template: ComponentStory<typeof RatingCard> = (args) => (
    <RatingCard {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}

export const NormalDark = Template.bind({})
NormalDark.args = {}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Normal4Star = Template.bind({})
Normal4Star.args = {
    starRate: 4,
}

export const NormalDark4Star = Template.bind({})
NormalDark4Star.args = {
    starRate: 4,
}
NormalDark4Star.decorators = [ThemeDecorator(Theme.DARK)]

import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { CommentCard } from './CommentCard'
import { FeatureFlagDecorator } from '@/shared/config/storybook/FeatureFlagDecorator/FeatureFlagDecorator'

const props = {
    comment: {
        id: '1',
        text: 'hello world',
        user: { id: '1', username: 'Vasya' },
    },
}
export default {
    title: 'entities/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>

const Template: ComponentStory<typeof CommentCard> = (args) => (
    <CommentCard {...args} />
)

export const Normal = Template.bind({})
Normal.args = props

export const NormalRedesigned = Template.bind({})
NormalRedesigned.args = props
NormalRedesigned.decorators = [FeatureFlagDecorator({ isAppRedesigned: true })]

export const Loading = Template.bind({})
Loading.args = { ...props, isLoading: true }

export const LoadingRedesigned = Template.bind({})
LoadingRedesigned.args = { ...props, isLoading: true }
LoadingRedesigned.decorators = [FeatureFlagDecorator({ isAppRedesigned: true })]

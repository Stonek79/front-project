import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ArticleAdditionInfo } from './ArticleAdditionInfo'

export default {
    title: 'widgets/ArticleAdditionInfo',
    component: ArticleAdditionInfo,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleAdditionInfo>

const Template: ComponentStory<typeof ArticleAdditionInfo> = (args) => (
    <ArticleAdditionInfo {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}

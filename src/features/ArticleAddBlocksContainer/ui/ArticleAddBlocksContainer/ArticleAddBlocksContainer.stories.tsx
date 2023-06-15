import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { ArticleAddBlocksContainer } from './ArticleAddBlocksContainer'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'feature/ArticleAddBlocksContainer',
    component: ArticleAddBlocksContainer,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleAddBlocksContainer>

const Template: ComponentStory<typeof ArticleAddBlocksContainer> = (args) => (
    <ArticleAddBlocksContainer {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}

export const NormalDark = Template.bind({})
NormalDark.args = {}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

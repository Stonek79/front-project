import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'
import { ArticlesSortSelector } from './ArticlesSortSelector'

export default {
    title: 'features/ArticlesSortSelector',
    component: ArticlesSortSelector,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesSortSelector>

const Template: ComponentStory<typeof ArticlesSortSelector> = (args) => <ArticlesSortSelector {...args} />

export const Normal = Template.bind({})
Normal.args = {}

export const NormalDark = Template.bind({})
NormalDark.args = {}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

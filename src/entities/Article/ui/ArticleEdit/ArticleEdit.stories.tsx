import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { ArticleEdit } from './ArticleEdit'

export default {
    title: '_/ArticleEdit',
    component: ArticleEdit,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleEdit>

const Template: ComponentStory<typeof ArticleEdit> = (args) => <ArticleEdit {...args} />

export const Normal = Template.bind({})
Normal.args = {}

export const NormalDark = Template.bind({})
NormalDark.args = {}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

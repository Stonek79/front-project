import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { ArticleEditAdditionBlock } from './ArticleEditAdditionBlock'
import { Theme } from '@/shared/const/theme'

export default {
    title: '_/ArticleEditAdditionBlock',
    component: ArticleEditAdditionBlock,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleEditAdditionBlock>

const Template: ComponentStory<typeof ArticleEditAdditionBlock> = (args) => (
    <ArticleEditAdditionBlock {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}

export const NormalDark = Template.bind({})
NormalDark.args = {}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

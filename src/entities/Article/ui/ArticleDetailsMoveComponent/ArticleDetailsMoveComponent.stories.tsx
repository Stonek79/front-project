import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { ArticleDetailsMoveComponent } from './ArticleDetailsMoveComponent'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'entities/ArticleDetailsMoveComponent',
    component: ArticleDetailsMoveComponent,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsMoveComponent>

const Template: ComponentStory<typeof ArticleDetailsMoveComponent> = (args) => (
    <ArticleDetailsMoveComponent {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}

export const NormalDark = Template.bind({})
NormalDark.args = {}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

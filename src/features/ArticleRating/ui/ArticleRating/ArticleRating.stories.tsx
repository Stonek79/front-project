import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import ArticleRating from './ArticleRating'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'features/ArticleRating',
    component: ArticleRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        StoreDecorator({
            user: {
                authData: {
                    id: '1',
                },
            },
        }),
    ],
} as ComponentMeta<typeof ArticleRating>

const Template: ComponentStory<typeof ArticleRating> = (args) => (
    <ArticleRating {...args} />
)

export const Normal = Template.bind({})
Normal.args = {
    articleId: '1',
}
Normal.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [],
        },
    ],
}

export const NormalDark = Template.bind({})
NormalDark.args = {
    articleId: '1',
}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]
NormalDark.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [],
        },
    ],
}

export const Normal4Stars = Template.bind({})
Normal4Stars.args = {
    articleId: '1',
}
Normal4Stars.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [
                {
                    starRate: 4,
                },
            ],
        },
    ],
}

export const NormalDark4Stars = Template.bind({})
NormalDark4Stars.args = {
    articleId: '1',
}
NormalDark4Stars.decorators = [ThemeDecorator(Theme.DARK)]
NormalDark4Stars.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings?userId=1&articleId=1`,
            method: 'GET',
            status: 200,
            response: [
                {
                    starRate: 4,
                },
            ],
        },
    ],
}

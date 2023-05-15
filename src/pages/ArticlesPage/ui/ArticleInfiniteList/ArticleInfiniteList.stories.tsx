import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { Article } from '@/entities/Article'
import { ArticleInfiniteList } from './ArticleInfiniteList'
import { Theme } from '@/shared/const/theme'

const article = {
    id: '1',
    title: 'Javascript news for today morning',
    subtitle: 'Что нового в JS за 2022 год?',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    user: {
        id: '1',
        username: 'admin',
        avatar: 'https://yt3.googleusercontent.com/ytc/AL5GRJWFuUDcz4xxj3J7WIMKh6m1dk4Tm0DfEEeiOGZD=s176-c-k-c0x00ffffff-no-rj',
    },
    views: 1022,
    createdAt: '26.02.2022',
    type: ['IT', 'SCIENCE', 'POLITICS', 'NEWS'],
    blocks: [],
} as Article

const articles = new Array(9)
    .fill(article)
    .map((art, ind) => ({ ...art, id: `${ind}` }))

export default {
    title: 'pages/ArticleInfiniteList',
    component: ArticleInfiniteList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        StoreDecorator({
            articlesPage: {
                ids: articles.map((art) => art.id),
            },
            article: {
                data: article,
            },
        }),
    ],
    parameters: {
        mockData: [
            {
                url: `${__API__}/articles?order=asc&sort=&search=&type=ALL`,
                method: 'GET',
                status: 200,
                response: [articles],
            },
        ],
    },
} as ComponentMeta<typeof ArticleInfiniteList>

const Template: ComponentStory<typeof ArticleInfiniteList> = (args) => (
    <ArticleInfiniteList {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}

export const NormalDark = Template.bind({})
NormalDark.args = {}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

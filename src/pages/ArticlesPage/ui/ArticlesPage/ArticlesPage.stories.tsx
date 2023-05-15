import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { Article } from '@/entities/Article'
import { SuspenseDecorator } from '@/shared/config/storybook/SuspenseDecorator/SuspenseDecorator'
import ArticlesPage from './ArticlesPage'

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
    title: 'pages/ArticlesPage',
    component: ArticlesPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        SuspenseDecorator,
        StoreDecorator({
            articlesPage: {
                ids: articles.map((art) => art.id),
                entities: {
                    data: article,
                },
            },
            profile: {
                data: {
                    id: '1',
                    username: 'user',
                },
            },
            article: {
                data: article,
            },
        }),
    ],
} as ComponentMeta<typeof ArticlesPage>

const Template: ComponentStory<typeof ArticlesPage> = (args) => (
    <ArticlesPage {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}

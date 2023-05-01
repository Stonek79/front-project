import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import withMock from 'storybook-addon-mock'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'
import ArticleRating from './ArticleRating'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'

export default {
    title: 'features/ArticleRating',
    component: ArticleRating,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock, StoreDecorator({
        user: {
            authData: {
                id: '1',
            },
        },
    })],
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export const NormalDark = Template.bind({});
NormalDark.args = {};
NormalDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Normal4Stars = Template.bind({});
Normal.args = {
    articleId: '1',
};

export const NormalDark4Stars = Template.bind({});
NormalDark.args = {
    articleId: '1',
};
NormalDark4Stars.decorators = [ThemeDecorator(Theme.DARK)]
Normal.parameters = {
    mockData: [
        {
            url: `${__API__}/article-ratings`,
            method: 'GET',
            status: 200,
            params: {
                userId: '1',
                articleId: '1',
            },
            response: [
                {
                    starRate: 4,
                },
            ],
        },
    ],
}

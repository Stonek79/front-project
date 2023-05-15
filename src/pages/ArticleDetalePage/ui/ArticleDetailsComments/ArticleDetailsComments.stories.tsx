import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { SuspenseDecorator } from '@/shared/config/storybook/SuspenseDecorator/SuspenseDecorator'
import { ArticleDetailsComments } from './ArticleDetailsComments'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'pages/ArticleDetailsComments',
    component: ArticleDetailsComments,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        SuspenseDecorator,
        StoreDecorator({
            comments: {
                ids: [],
            },
        }),
    ],
} as ComponentMeta<typeof ArticleDetailsComments>

const Template: ComponentStory<typeof ArticleDetailsComments> = (args) => (
    <ArticleDetailsComments {...args} />
)

export const Normal = Template.bind({})
Normal.args = {
    id: '1',
}

export const NormalDark = Template.bind({})
NormalDark.args = {
    id: '1',
}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

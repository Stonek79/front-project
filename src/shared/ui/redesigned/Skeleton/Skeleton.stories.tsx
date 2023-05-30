import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Skeleton } from './Skeleton'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'shared/Skeleton',
    component: Skeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Skeleton>

const Template: ComponentStory<typeof Skeleton> = (args) => (
    <Skeleton {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}

export const Round = Template.bind({})
Round.args = {
    height: 100,
    width: 100,
    border: '50%',
}

export const NormalDark = Template.bind({})
NormalDark.args = {}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

export const RoundDark = Template.bind({})
RoundDark.args = {
    height: 100,
    width: 100,
    border: '50%',
}
RoundDark.decorators = [ThemeDecorator(Theme.DARK)]

export const NormalLiliac = Template.bind({})
NormalLiliac.args = {}
NormalLiliac.decorators = [ThemeDecorator(Theme.LILAC)]

export const RoundLiliac = Template.bind({})
RoundLiliac.args = {
    height: 100,
    width: 100,
    border: '50%',
}
RoundLiliac.decorators = [ThemeDecorator(Theme.LILAC)]

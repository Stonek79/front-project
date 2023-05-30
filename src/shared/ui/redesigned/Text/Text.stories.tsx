import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Text } from './Text'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

export const TitleText = Template.bind({})
TitleText.args = {
    title: 'Title text',
    text: 'Text text',
}

export const TitleTextDark = Template.bind({})
TitleTextDark.args = {
    title: 'Title text',
    text: 'Text text',
}
TitleTextDark.decorators = [ThemeDecorator(Theme.DARK)]

export const OnlyTitle = Template.bind({})
OnlyTitle.args = {
    title: 'Title text',
}

export const OnlyText = Template.bind({})
OnlyText.args = {
    text: 'Text text',
}

export const TitleTextError = Template.bind({})
TitleTextError.args = {
    title: 'Title text',
    text: 'Text text',
    variant: 'error',
}

export const TitleTextErrorDark = Template.bind({})
TitleTextErrorDark.args = {
    title: 'Title text',
    text: 'Text text',
    variant: 'error',
}
TitleTextErrorDark.decorators = [ThemeDecorator(Theme.DARK)]

export const SizeL = Template.bind({})
SizeL.args = {
    size: 'l',
    title: 'Title text',
    text: 'Text text',
}

export const SizeM = Template.bind({})
SizeM.args = {
    size: 'm',
    title: 'Title text',
    text: 'Text text',
}

export const SizeS = Template.bind({})
SizeS.args = {
    size: 's',
    title: 'Title text',
    text: 'Text text',
}

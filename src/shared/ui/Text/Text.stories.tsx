import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Text, TextSize, TextTheme } from './Text'

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
    theme: TextTheme.ERROR,
}

export const TitleTextErrorDark = Template.bind({})
TitleTextErrorDark.args = {
    title: 'Title text',
    text: 'Text text',
    theme: TextTheme.ERROR,
}
TitleTextErrorDark.decorators = [ThemeDecorator(Theme.DARK)]

export const SizeL = Template.bind({})
SizeL.args = {
    size: TextSize.L,
    title: 'Title text',
    text: 'Text text',
}

export const SizeM = Template.bind({})
SizeM.args = {
    size: TextSize.M,
    title: 'Title text',
    text: 'Text text',
}

export const SizeS = Template.bind({})
SizeS.args = {
    size: TextSize.S,
    title: 'Title text',
    text: 'Text text',
}

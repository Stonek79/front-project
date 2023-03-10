import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Text, TextTheme } from './Text'

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

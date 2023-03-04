import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Button, ButtonSize, ButtonTheme } from './Button'

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
    children: 'Text',
}

export const Clear = Template.bind({})
Clear.args = {
    children: 'Text',
    theme: ButtonTheme.CLEAR,
}

export const ClearInverted = Template.bind({})
ClearInverted.args = {
    children: 'Text',
    theme: ButtonTheme.CLEAR_INVERTED,
}

export const Outline = Template.bind({})
Outline.args = {
    children: 'Text',
    theme: ButtonTheme.OUTLINE,
}

export const OutlineSizeL = Template.bind({})
OutlineSizeL.args = {
    children: 'Text',
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.L,
}

export const OutlineSizeXL = Template.bind({})
OutlineSizeXL.args = {
    children: 'Text',
    theme: ButtonTheme.OUTLINE,
    size: ButtonSize.XL,
}

export const OutlineDark = Template.bind({})
OutlineDark.args = {
    children: 'Text',
    theme: ButtonTheme.OUTLINE,
}
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)]

export const BgTheme = Template.bind({})
BgTheme.args = {
    children: 'Text',
    theme: ButtonTheme.BG,
}

export const BgThemeInverted = Template.bind({})
BgThemeInverted.args = {
    children: 'Text',
    theme: ButtonTheme.BG_INVERTED,
}

export const SquareTheme = Template.bind({})
SquareTheme.args = {
    children: '>',
    theme: ButtonTheme.BG_INVERTED,
    square: true,
}

export const SizeM = Template.bind({})
SizeM.args = {
    children: '>',
    theme: ButtonTheme.BG_INVERTED,
    square: true,
    size: ButtonSize.M,
}

export const SizeL = Template.bind({})
SizeL.args = {
    children: '>',
    theme: ButtonTheme.BG_INVERTED,
    square: true,
    size: ButtonSize.L,
}

export const SizeXL = Template.bind({})
SizeXL.args = {
    children: '>',
    theme: ButtonTheme.BG_INVERTED,
    square: true,
    size: ButtonSize.XL,
}

export const Disabled = Template.bind({})
Disabled.args = {
    children: '>',
    theme: ButtonTheme.BG_INVERTED,
    disabled: true,
}

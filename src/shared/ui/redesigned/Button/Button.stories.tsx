import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from './Button'

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Outline = Template.bind({})
Outline.args = {
    children: 'Text',
}

export const Clear = Template.bind({})
Clear.args = {
    children: 'Text',
    variant: 'clear',
}

export const OutlineSizeL = Template.bind({})
OutlineSizeL.args = {
    children: 'Text',
    size: 'l',
}

export const OutlineSizeXL = Template.bind({})
OutlineSizeXL.args = {
    children: 'Text',
    size: 'xl',
}

export const SizeM = Template.bind({})
SizeM.args = {
    children: '>',
    size: 'm',
}

export const SizeL = Template.bind({})
SizeL.args = {
    children: '>',
    size: 'l',
}

export const SizeXL = Template.bind({})
SizeXL.args = {
    children: '>',
    size: 'xl',
}

export const Disabled = Template.bind({})
Disabled.args = {
    children: '>',
    disabled: true,
}

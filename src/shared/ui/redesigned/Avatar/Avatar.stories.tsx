import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import AvatarJpg from '../../../assets/avatar.jpg'
import { Avatar } from './Avatar'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Avatar>

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />

export const PrimarySmall = Template.bind({})
PrimarySmall.args = {
    size: 50,
    src: AvatarJpg,
}

export const PrimaryNormal = Template.bind({})
PrimaryNormal.args = {
    src: AvatarJpg,
}

export const PrimaryDarkBig = Template.bind({})
PrimaryDarkBig.args = {
    size: 150,
    src: AvatarJpg,
}
PrimaryDarkBig.decorators = [ThemeDecorator(Theme.DARK)]

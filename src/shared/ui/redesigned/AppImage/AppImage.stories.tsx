import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { AppImage } from './AppImage'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'shared/AppImage',
    component: AppImage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AppImage>

const Template: ComponentStory<typeof AppImage> = (args) => (
    <AppImage {...args} />
)

export const Normal = Template.bind({})
Normal.args = {
    src: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' || '',
    height: 100,
    width: 100,
}

export const NormalDark = Template.bind({})
NormalDark.args = {
    src: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' || '',
    height: 100,
    width: 100,
}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

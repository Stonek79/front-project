import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { MainPagePicturesCarousel } from './MainPagePicturesCarousel'
import { Theme } from '@/shared/const/theme'

export default {
    title: '_/MainPagePicturesCarousel',
    component: MainPagePicturesCarousel,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MainPagePicturesCarousel>

const Template: ComponentStory<typeof MainPagePicturesCarousel> = (args) => (
    <MainPagePicturesCarousel {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}

export const NormalDark = Template.bind({})
NormalDark.args = {}
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]

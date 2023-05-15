import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Countries } from '../../model/types/countries'
import { CountrySelect } from './CountrySelect'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'entities/CountrySelect',
    component: CountrySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CountrySelect>

const Template: ComponentStory<typeof CountrySelect> = (args) => (
    <CountrySelect {...args} />
)

export const PrimaryNormal = Template.bind({})
PrimaryNormal.args = {
    value: Countries.USA,
}

export const PrimaryDarkBig = Template.bind({})
PrimaryDarkBig.args = {
    value: Countries.USA,
}
PrimaryDarkBig.decorators = [ThemeDecorator(Theme.DARK)]

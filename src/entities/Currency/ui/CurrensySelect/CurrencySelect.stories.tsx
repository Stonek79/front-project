import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Currency } from '../../model/types/currency'
import { CurrencySelect } from './CurrencySelect'
import { Theme } from '@/shared/const/theme'

export default {
    title: 'entities/CurrencySelect',
    component: CurrencySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CurrencySelect>

const Template: ComponentStory<typeof CurrencySelect> = (args) => (
    <CurrencySelect {...args} />
)

export const PrimaryNormal = Template.bind({})
PrimaryNormal.args = {
    value: Currency.USD,
}

export const PrimaryDarkBig = Template.bind({})
PrimaryDarkBig.args = {
    value: Currency.USD,
}
PrimaryDarkBig.decorators = [ThemeDecorator(Theme.DARK)]

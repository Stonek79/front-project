import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { CountrySelect } from './CountrySelect'

export default {
    title: 'entities/CountrySelect',
    component: CountrySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CountrySelect>;

const Template: ComponentStory<typeof CountrySelect> = (args) => <CountrySelect {...args} />;

export const PrimaryNormal = Template.bind({});
PrimaryNormal.args = {
};

export const PrimaryDarkBig = Template.bind({});
PrimaryDarkBig.args = {
};
PrimaryDarkBig.decorators = [ThemeDecorator(Theme.DARK)];

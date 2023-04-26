import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { Select } from './Select'

export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const PrimarySmall = Template.bind({});
PrimarySmall.args = {
    label: 'select',
    options: [
        { value: 'value123', content: 'content123' },
        { value: 'value133', content: 'content133' },
        { value: 'value122', content: 'content122' },
    ],
};

export const PrimaryNormal = Template.bind({});
PrimaryNormal.args = {
    label: 'select',
    options: [
        { value: 'value123', content: 'content123' },
        { value: 'value133', content: 'content133' },
        { value: 'value122', content: 'content122' },
    ],
};

export const PrimaryDarkBig = Template.bind({});
PrimaryDarkBig.args = {
    label: 'select',
    options: [
        { value: 'value123', content: 'content123' },
        { value: 'value133', content: 'content133' },
        { value: 'value122', content: 'content122' },
    ],
};
PrimaryDarkBig.decorators = [ThemeDecorator(Theme.DARK)];

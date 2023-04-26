import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { ListBox } from './ListBox'

export default {
    title: 'shared/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [(Story) => (
        <div style={{
            padding: '200px',
        }}
        >
            <Story />
        </div>
    )],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    items: [
        { value: 'value 1', content: 'content content 1' },
        { value: 'value 1', content: 'content content 1' },
        { value: 'value 1', content: 'content content 1', disabled: true },
        { value: 'value 1', content: 'content content 1' },
        { value: 'value 1', content: 'content content 1' },
    ],
    direction: 'bottom left',
    label: 'Label',
    value: undefined,
    defaultValue: 'Default value',
    onChange: () => ({}),
};

export const NormalDark = Template.bind({});
NormalDark.args = {
    items: [
        { value: 'value 1', content: 'content content 1' },
        { value: 'value 1', content: 'content content 1' },
        { value: 'value 1', content: 'content content 1', disabled: true },
        { value: 'value 1', content: 'content content 1' },
        { value: 'value 1', content: 'content content 1' },
    ],
    direction: 'bottom right',
    label: 'Label',
    value: undefined,
    defaultValue: 'Default value',
    onChange: () => ({}),
};
NormalDark.decorators = [ThemeDecorator(Theme.DARK)];

import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { UserNavbarDropdown } from './UserNavbarDropdown'

export default {
    title: 'features/UserNavbarDropdown',
    component: UserNavbarDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof UserNavbarDropdown>;

const Template: ComponentStory<typeof UserNavbarDropdown> = (args) => <UserNavbarDropdown {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export const NormalDark = Template.bind({});
NormalDark.args = {};
NormalDark.decorators = [ThemeDecorator(Theme.DARK)];

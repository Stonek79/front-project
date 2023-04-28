import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { SuspenseDecorator } from '@/shared/config/storybook/SuspenseDecorator/SuspenseDecorator'
import { UserNavbarDropdown } from './UserNavbarDropdown'

export default {
    title: 'features/UserNavbarDropdown',
    component: UserNavbarDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [SuspenseDecorator, StoreDecorator({
        user: {
            authData: { username: 'XXXXX', avatar: 'https://i.pravatar.cc/300', id: '1' },
            inited: true,
        },
    }), SuspenseDecorator],
} as ComponentMeta<typeof UserNavbarDropdown>;

const Template: ComponentStory<typeof UserNavbarDropdown> = (args) => <UserNavbarDropdown {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    authData: {
        id: '1',
        username: 'XXXXX',
        avatar: 'https://i.pravatar.cc/300',
        roles: [],
    },
    onLogOut: () => ({}),
};

export const NormalDark = Template.bind({});
NormalDark.args = {
    authData: {
        id: '1',
        username: 'XXXXX',
        avatar: 'https://i.pravatar.cc/300',
        roles: [],
    },
    onLogOut: () => ({}),
};
NormalDark.decorators = [ThemeDecorator(Theme.DARK)];

import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { SuspenseDecorator } from '@/shared/config/storybook/SuspenseDecorator/SuspenseDecorator'
import { UserNavbarDropdown } from './UserNavbarDropdown'
import { Theme } from '@/shared/const/theme';

export default {
    title: 'features/UserNavbarDropdown',
    component: UserNavbarDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [SuspenseDecorator, StoreDecorator({
        user: {
            authData: { username: 'XXXXX', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', id: '1' },
            inited: true,
        },
    })],
} as ComponentMeta<typeof UserNavbarDropdown>;

const Template: ComponentStory<typeof UserNavbarDropdown> = (args) => <UserNavbarDropdown {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    authData: {
        id: '1',
        username: 'XXXXX',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' || '',
        roles: ['admin'],
    },
    onLogOut: () => ({}),
};

export const NormalDark = Template.bind({});
NormalDark.args = {
    authData: {
        id: '1',
        username: 'XXXXX',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' || '',
        roles: ['admin'],
    },
    onLogOut: () => ({}),
};
NormalDark.decorators = [ThemeDecorator(Theme.DARK)];

export const NormalIsAdmin = Template.bind({});
NormalIsAdmin.args = {
    authData: {
        id: '1',
        username: 'XXXXX',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' || '',
        roles: ['admin'],
    },
    onLogOut: () => ({}),
};

NormalIsAdmin.decorators = [StoreDecorator({
    user: {
        authData: {
            roles: ['admin'],
        },
    },
})]

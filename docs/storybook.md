## Storybook

The project describes story cases for each component.
Requests to the server are mocked using storybook-addon-mock.

The file with the stories is created next to the component with the MainLayout.stories.tsx extension

You can run storybook with the command:
- `npm run storybook`

Learn more about [Storybook](/docs/storybook.md)

Example:

```typescript jsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { Currency } from '@/entities/Currency'
import { Countries } from '@/entities/Country'
import { ProfileCardDeprecated } from './ProfileCardDeprecated'
import AvatarImg from '../../../../shared/assets/avatar.jpg'
import { Theme } from '@/shared/const/theme';

const data = {
    firstname: 'Alex',
    lastname: 'Smith',
    age: '42',
    currency: Currency.RUB,
    country: Countries.Russia,
    city: 'Moscow',
    username: 'Stonek79',
    avatar: AvatarImg,
}

export default {
    title: 'entities/ProfileCardDeprecated',
    component: ProfileCardDeprecated,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCardDeprecated>;

const Template: ComponentStory<typeof ProfileCardDeprecated> = (args) => <ProfileCardDeprecated {...args} />;

export const Readonly = Template.bind({});
Readonly.args = {
    readonly: true,
    isLoading: false,
    data,
};

export const ReadonlyDark = Template.bind({});
ReadonlyDark.args = {
    readonly: true,
    isLoading: false,
    data,
};
ReadonlyDark.decorators = [ThemeDecorator(Theme.DARK)];
```


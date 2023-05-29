# front-project

## Project Launch

```
npm install - installing dependencies
npm run start:dev - running the frontend project server in dev mode with WEBPACK
or 
npm run start:dev:vite - running the frontend project server in dev mode with VITE
```

----

## Scripts

- `npm run start` - Launching a frontend project on a webpack dev server
- `npm run start:vite` - Launching a frontend project on vite
- `npm run start:dev` - Launching a frontend project on a webpack dev server + backend
- `npm run start:dev:vite` - Launching a frontend project on vite+ backend
- `npm run start:dev:server` - Starting the backend server with 'json-server'
- `npm run build:prod` - Build in prod mode
- `npm run build:dev` - Build in dev mode (not minimized)
- `npm run lint:ts` - Checking ts files by linter
- `npm run lint:ts:fix` - Correction of ts files by linter
- `npm run lint:scss` - Checking scss files by linter
- `npm run lint:scss:fix` - Correction of scss files by linter
- `npm run test:unit` - Running unit tests with jest
- `npm run test:ui` - Running screenshots of tests with loki
- `npm run test:ui:ok` - Confirmation of new screenshots
- `npm run test:ui:ci` - Running screenshots of tests in CI
- `npm run test:ui:report` - Generating a full report for screenshots of tests
- `npm run test:ui:json` - Generating a json report for screenshot tests
- `npm run test:ui:html` - Generating HTML report for screenshot tests
- `npm run storybook` - Launching Storybook
- `npm run storybook:build` - Building a storybook build
- `npm run prepare` - Precommit hooks
- `npm run create:slice` - Script for generating FSD slices

----

## Project architecture

The project is written in accordance with the Feature sliced design methodology

Link to documentation - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Working with translations (i18next)

The project uses the i18next library to work with translations.
Files with translations are stored in public/locales.

For comfortable work, we recommend installing the plugin for webstorm/vscode

i18next documentation - [https://react.i18next.com/](https://react.i18next.com/)

----

## Tests

The project uses 4 types of tests:
1) Standard unit tests for jest - `npm run test:unit`
2) Component tests with React testing library -`npm run test:unit`
3) Screenshot testing with loki `npm run test:ui`
4) e2e testing with Cypress `npm run test:e2e`

More about the tests - [документация тестирование](/docs/test.md)

----

## Linting

The project uses eslint to check typescript code and stylelint to check files with styles.


Also, for strict control of the main architectural principles
, a proprietary eslint plugin *eslint-plugin-fsd-paths-checker-plugin* is used,
which contains 3 rules
1) fsd-paths-checker-plugin - prohibits the use of absolute imports within a single module
2) layer-import-control - checks the correctness of using layers from the FSD point of view
   (for example, widgets cannot be used in features and entities)
3) public-imports - allows importing from other modules only from the public api. Has an automatic fix

##### Launching Linters
- `npm run lint:ts` - Checking ts files by linter
- `npm run lint:ts:fix` - Correction of ts files by linter
- `npm run lint:scss` - Checking scss files by linter
- `npm run lint:scss:fix` - Correction of scss files by linter

----
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
import { ProfileCard } from './ProfileCard'
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
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

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


----

## Project Configuration

For development, the project contains 2 configs:
1. Webpack - ./config/build
2. vite - vite.config.ts

Both collectors are adapted to the main features of the application.

The entire configuration is stored in /config
- /config/babel - babel
- /config/build - webpack configuration
- /config/jest - test environment configuration
- /config/storybook - storybook configuration

The `scripts` folder contains various scripts for refactoring\simplifying code writing\generating reports, etc.

----

## CI pipeline and pre commit hooks

The gitHub actions configuration is located in /.github/workflows.
In ci, all kinds of tests are run, project assembly and storybook, linting.

In precommit hooks, we check the project with linters, config in /.husky

----

### Working with data

Interaction with the data is carried out using the redux toolkit.
If possible, reused entities should be normalized using EntityAdapter

Requests to the server are sent using [RTK query](/src/shared/api/rtkApi.ts)

For asynchronous connection of reducers (in order not to pull them into a common bundle), use
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

----

### Working with feature-flags

It is allowed to use feature flags only with the help of the toggleFeatures helper
an object with options is passed to it

{<br>
`name`: feature flag name,<br>
`on`: the function that will work after Enabling the feature,<br>
`off`: the function that will work after Disabling the feature<br>
}

To automatically remove a feature, use the remove-feature.ts script, which takes 2 arguments
1. Name of the feature flag to be deleted
2. State (on\off)

----

## Entities

- [Article](/src/entities/Article)
- [Comment](/src/entities/Comment)
- [Country](/src/entities/Country)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)

## Features

- [AddCommentForm](/src/features/AddCommentForm)
- [ArticleRating](/src/features/ArticleRating)
- [ArticleRecommendationsList](/src/features/ArticleRecommendationsList)
- [ArticlesSortSelector](/src/features/ArticlesSortSelector)
- [ArticleTypeTabs](/src/features/ArticleTypeTabs)
- [ArticleViewSelector](/src/features/ArticleViewSelector)
- [AuthByUsername](/src/features/AuthByUsername)
- [UserNavbarDropdown](/src/features/UserNavbarDropdown)
- [ProfilePageEdit](/src/features/ProfilePageEdit)
- [LangSwitcher](/src/features/LangSwitcher)
- [NotificationButton](/src/features/NotificationButton)
- [ProfileRating](/src/features/ProfileRating)
- [ThemeSwitcher](/src/features/ThemeSwitcher)

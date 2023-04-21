module.exports = {
    stories: [
        '../../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        'storybook-addon-mock/register',
    ],
    staticDirs: ['../../public'],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
};

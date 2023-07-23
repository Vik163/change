module.exports = {
    stories: [
        '../../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        // '@storybook/addon-essentials',
        {
            name: '@storybook/addon-essentials', // 13_12
            options: {
                backgrounds: false,
            },
        },
        '@storybook/addon-interactions',
        '@storybook-addon-mock/register', // 11_7 17min
        'storybook-addon-themes', // 13_12
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
};

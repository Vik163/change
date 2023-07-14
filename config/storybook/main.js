module.exports = {
    stories: [
        '../../src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook-addon-mock/register', // 11_7 17min
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
};

//     rules: {
//         'react/jsx-indent': [2, 4],
//         'react/jsx-indent-props': [2, 4],
//         indent: [2, 4],
//         'react/jsx-filename-extension': [
//             2,
//             { extensions: ['.js', '.jsx', '.tsx'] },
//         ],
//         'no-unused-vars': 'off',
//         '@typescript-eslint/no-unused-vars': [
//             'error',
//             { argsIgnorePattern: '^_' },
//         ],
//         'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks надо ставить 4_1 20 минута
//         'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies надо ставить
//         'import/no-unresolved': 'off',
//         'import/prefer-default-export': 'off',
//         'react/require-default-props': 'off',
//         'react/react-in-jsx-scope': 'off',
//         'react/jsx-props-no-spreading': 'warn',
//         'arrow-body-style': 'off', // убирает return
//         'react/self-closing-comp': 'off', // сжимает пустой компонент
//         'react/function-component-definition': 'off', // импорт React
//         'no-shadow': 'off',
//         'jsx-a11y/click-events-have-key-events': 'off',
//         'jsx-a11y/no-static-element-interactions': 'off',
//         'import/extensions': 'off',
//         // импорт фалов без расширения
//         'import/no-extraneous-dependencies': 'warn',
//         // импорт webpack
//         'no-underscore-dangle': 'off',
//         // нижнее подчеркивание
//         'i18next/no-literal-string': 'off', // переводы только в jsx
//         // 'i18next/no-literal-string': [
//         //     'error',
//         //     {
//         //         markupOnly: true,
//         //         ignoreAttribute: ['data-testid', 'to'],
//         //     },
//         // ], // переводы только в jsx

//         'max-len': ['error', { ignoreComments: true, code: 140 }], // длина комментариев и кода
//         'no-param-reassign': 'off', // отключаем запрет на изменение аргументов функции для redux
//         'no-undef': 'off', // 5_6 7 min
//         'react/no-array-index-key': 'off',
//         'linebreak-style': 'off', // LF

//     },

module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'i18next',
        'react-hooks',
        'ulbi-tv-plugin',
        'unused-imports',
        // eslint-plugin-import 13_8 1.40min популярный плагин
    ],
    rules: {
        'unused-imports/no-unused-imports': 'error', // 13_8
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.tsx'] },
        ],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'off',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'warn',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'i18next/no-literal-string': 'off',
        // 'i18next/no-literal-string': [
        //     'error',
        //     {
        //         markupOnly: true,
        //         ignoreAttribute: ['data-testid', 'to', 'target'],
        //     },
        // ],
        'max-len': ['error', { ignoreComments: true, code: 125 }],
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies,
        'no-param-reassign': 'off',
        'no-undef': 'off',
        'react/no-array-index-key': 'off',
        'arrow-body-style': 'off',
        'ulbi-tv-plugin/path-checker': ['error', { alias: '@' }], // кастомный плагин 10_2 и 13_2 7min
        'ulbi-tv-plugin/layer-imports': [ // 13_6 6min
            'error',
            {
                alias: '@',
                ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
            },
        ],
        'ulbi-tv-plugin/public-api-imports': [ // кастомный плагин 13_3 7min
            'error',
            {
                alias: '@',
                testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx'], // 13_4 1min
            },
        ],
        'linebreak-style': 'off', // LF
        'react/self-closing-comp': 'off', // сжимает пустой компонент
        'react/jsx-max-props-per-line': ['error', {maximum: 3}] // 14_12 количество пропсов в строчке
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
                'max-len': 'off',
            },
        },
    ],
};

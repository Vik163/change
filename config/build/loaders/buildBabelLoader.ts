import { BuildOptions } from '../types/config';

export function buildBabelLoader({ isDev }: BuildOptions) {
    return {
        test: /\.(js|jsx|tsx)$/, // меняем расширения
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    [
                        'i18next-extract',
                        {
                            locales: ['ru', 'en'], // какие
                            keyAsDefaultValue: true, // в качестве значения подставляет ключ
                        },
                    ],
                    isDev && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
            },
        },
    };
}

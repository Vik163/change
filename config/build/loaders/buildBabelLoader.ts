import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';
import { BuildOptions } from '../types/config';

// 11_10 миграция на babel-loader
interface BuildBabelLoaderProps extends BuildOptions {
    isTsx?: boolean;
}

// export function buildBabelLoader({ isDev }: BuildOptions) {
export function buildBabelLoader({ isDev, isTsx }: BuildBabelLoaderProps) {
    return {
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/, // меняем расширения
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
                    [
                        '@babel/plugin-transform-typescript', // 11_10 4min
                        {
                            isTsx,
                        },
                    ],
                    '@babel/plugin-transform-runtime',
                    isTsx && [ // 11_10 15min
                        babelRemovePropsPlugin,
                        {
                            props: ['data-testid'],
                        },
                    ],
                    isDev && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
            },
        },
    };
}

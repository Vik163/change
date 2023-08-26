import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { BuildOptions } from './types/config';

// if(isDev) {
//   plugins.push(new webpack.HotModuleReplacementPlugin()), // видео 2_6
//   plugins.push(new webpack.ReactRefreshWebpackPlugin())}

export function buildPlugins({
    paths,
    isDev,
    apiUrl,
    project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    const isProd = !isDev; // 13_17 улучшаем сборку

    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        // прокидывает глобальные переменные
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        // кольцевые зависимости 11_9
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true, // при обнаружении выпадает ошибка
        }),
        // миграция на babel-loader 11_10 8min обработка типов отдельно при загрузке
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: 'write-references',
            },
        }),
    ];

    // CI (github actions) запускаются только при dev
    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin());
        // В новых версиях не нужен HotModuleReplacementPlugin если в devServere стоит hot: true,
        // если не работает HotModuleReplac., то React refresh plugin. видео 6_6
        plugins.push(new webpack.HotModuleReplacementPlugin()); // видео 2_6
        plugins.push(
            new BundleAnalyzerPlugin({
                // не открывается постоянно
                openAnalyzer: false, // запуск по ссылке в терминале
            }),
        ); // Анализирует размер бандла
    }

    if (isProd) {
        // 13_17 улучшаем сборку
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
        );
        // сборка переводов 9_6
        plugins.push(
            new CopyPlugin({
                patterns: [{ from: paths.locales, to: paths.buildLocales }],
            }),
        );
    }

    return plugins;
}

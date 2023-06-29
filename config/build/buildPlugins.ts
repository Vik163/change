import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { BuildOptions } from './types/config';

// if(isDev) {
//   plugins.push(new webpack.HotModuleReplacementPlugin()), // видео 2_6
//   plugins.push(new webpack.ReactRefreshWebpackPlugin())}

export function buildPlugins({
    paths, isDev, apiUrl, project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),

        // прокидывает глобальные переменные
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),

        // сборка переводов 9_6
        new CopyPlugin({
            patterns: [
                { from: paths.locales, to: paths.buildLocales },
            ],
        }),
    ];

    // CI (github actions) запускаются только при dev
    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin());
        // если не работает HotModuleReplac., то React refresh plugin. видео 6_6
        plugins.push(new webpack.HotModuleReplacementPlugin()); // видео 2_6
        plugins.push(new BundleAnalyzerPlugin({
        // не открывается постоянно
            openAnalyzer: false, // запуск по ссылке в терминале
        })); // Анализирует размер бандла
    }

    return plugins;
}

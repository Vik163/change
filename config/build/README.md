### Сборка webpack

```
1. Инициализируем проект npm init -y
2. Устанавливаем зависимости:
    - webpack,
    - webpack-cli - позволяет запускать из терминала,
    - webpack-dev-server - изменения без сборки,
    - typescript,
    - @types/webpack,
    - @types/webpack-dev-server
    - ts-loader - обрабатывает (ts tsx) файлы,
    - ts-node - это механизм выполнения TypeScript для Node.js. Преобразует TypeScript в JavaScript, позволяя напрямую выполнять TypeScript на Node.js без предварительной компиляции,
    - @types/node
3. Создаем файл tsconfig.json
```

tsconfig.json - инфа из [доков](https://webpack.js.org/guides/typescript/)

```
4. webpack.config.ts - конфигурация webpack (файл в корне)
```

Декомпозируем: папка config -> build (в корне)

- папка types - config.ts - прописываем типы

---

- buildWebpackConfig\*\* - _function buildWebpackConfig(options: BuildOptions): webpack.Configuration_ - webpack.Configuration (дефолтная). Возвращаем [конфиг](https://webpack.js.org/guides/getting-started/)

---

- buildDevServer - _function buildDevServer(options: BuildOptions): DevServerConfiguration_ (импорт { Configuration as DevServerConfiguration } дефолтная). Возвращает [настройки](https://webpack.js.org/configuration/dev-server/#root). Получаем в \*\*.

---

- buildResolvers - прописывает расширения файлов (при импортах не пишутся).
  _function buildResolvers(options: BuildOptions): ResolveOptions_ (ResolveOptions дефолтная). Возвращает [настройки](https://webpack.js.org/configuration/resolve/#resolve) в \*\*

---

- buildPlugins - _function buildPlugins({ paths, isDev, apiUrl, project,}: BuildOptions): webpack.WebpackPluginInstance[]_ - возвращает массив плагинов в \*\*, который в зависимости от сборки редактирует.

  - `import HtmlWebpackPlugin from 'html-webpack-plugin'` <br> `new HtmlWebpackPlugin({template: paths.html,})` - для html, в опциях прописываем путь до файла.
  - `new webpack.ProgressPlugin()` - показывает процесс сборки. Уже установлен.
  - `new webpack.DefinePlugin({ __IS_DEV__: JSON.stringify(isDev),})` - прокидывает глобальные переменные. Уже установлен.
  - `import CircularDependencyPlugin from 'circular-dependency-plugin'` <br> `new CircularDependencyPlugin({ exclude: /node_modules/, failOnError: true, // при обнаружении выпадает ошибка })` <br> `@types/circular-dependency-plugin` - показывает кольцевые зависимости.
  - `import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'` <br> `new ForkTsCheckerWebpackPlugin({настройки})` - выносит проверку типов в отдельный процесс ускоряя сборку. [настройки](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin) <br>
    Нужно использовать изолированные модули (файлы в которых находятся только интерфейсы или типы). Указывать type при экспорте `export type {qqqqqqqqq} from файла с типами` и в tsconfig `"isolatedModules": true`

- ##### Для dev режима

  - `import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'` <br> `new ReactRefreshWebpackPlugin()` - благодаря этому плагину при перезагрузке страницы состояния state компонентов остаются неизменными.
  - `new webpack.HotModuleReplacementPlugin()` — используется для обновления модулей в режиме реального времени без перезагрузки страницы. Уже установлен.
  - `import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'` <br> `new BundleAnalyzerPlugin({ openAnalyzer: false, // запуск по ссылке в терминале })` <br> `@types/webpack-bundle-analyzer` - размер бандла

- ##### Для prod режима

  - `import MiniCssExtractPlugin from 'mini-css-extract-plugin'` <br> `new MiniCssExtractPlugin({настройки})` - [извлекает](https://webpack.js.org/plugins/mini-css-extract-plugin) CSS в отдельные файлы. Он создает CSS-файл для каждого JS-файла, который содержит CSS.

---

- buildLoaders - _function buildLoaders(options: BuildOptions): webpack.RuleSetRule[]_ - возвращает массив [лоадеров](https://webpack.js.org/loaders/) в \*\* (`имеет значение место в массиве сначала babelLoader потом typeScriptLoaders`)
  - // babelLoader,
  - fileLoader, - установить file-loader
  - svgLoader, - установить @svgr/webpack
  - codeBabelLoader, - установить:
    - babel-loader
    - @babel/core
    - @babel/plugin-transform-runtime
    - @babel/plugin-transform-typescript
    - @babel/preset-env
    - @babel/preset-react
    - @babel/preset-typescript
  - tsxCodeBabelLoader,
  - // typescriptLoader, - установить ts-loader
  - cssLoader,
- папка loaders - выносим в файлы большие лоадеры

  - cssLoader в buildCssLoaders [конфигурация](https://webpack.js.org/concepts/loaders/#configuration)

  ```
  npm install --save-dev style-loader  css-loader
  npm install sass-loader sass webpack --save-dev
  style-loader - 1 очередность важна
  css-loader - 2
  sass-loader -3
  ```

  - codeBabelLoader - buildBabelLoader [(babelLoader)](https://webpack.js.org/loaders/babel-loader) - новые стандарты js перегоняет в старые. В файлах ts можно использовать ts-loader, но при правильной настройке babel быстрее.

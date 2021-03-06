# webpack-study

`npx webpack --watch`：用于实时监测文件变化并重新执行打包

`webpack-dev-server`：用于创建一个开发服务器，能实时侦测代码的修改并实现自动更新执行的结果（热更新和自动刷新）

## [资源模块（asset module）](https://webpack.docschina.org/guides/asset-modules/#root)

资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

- asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
    - 理解为复制一份文件到打包后的目录并使路径正确
- asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
    - 将文件转为 base64 格式
    - 无 generator 选项
- asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
    - 将文件内容导出为字符串
- asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。
    - 也就是在 asset/resource 和 asset/inline 之间选择
    - 默认情况下 大于 8kb 会使用 asset/resource，小于则使用 asset/inline 

## [loader](https://webpack.docschina.org/concepts/loaders/)

### loader 加载 css|scss

1. 安装：`npm i -D css-loader scss-loader sass mini-css-extract-plugin css-minimizer-webpack-plugin`

> - mini-css-extract-plugin：用来抽离 css 为一个单独文件
> - css-minimizer-webpack-plugin：用来对 css 进行压缩

### 加载字体文件

使用内置的资源模块即可

### 加载 csv、tsv、xml 类型文件

1. 安装：`npm i -D xml-loader csv-loader`

### 自定义 json 模块 parser

1. 通过使用自定义 parser 替代特定的 webpack loader，可以将任何 toml、yaml、json5 文件作为 json 模块导入
2. 安装：`npm i -D toml yamljs json5`

## babel 转义 js

- 安装：`npm i -D @babel/core @babel/preset-env babel-loader`
    - @babel/core：babel 核心模块
    - @babel/preset-env：babel 预设，一组 babel 插件的合集
- 配置：
```js
rules: [
    {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    }
]
```
- 以上步骤会报错：regeneratorRuntime is not defined。 
- 所以需安装：`npm i -D @babel/runtime @babel/plugin-transform-runtime`
- 配置：
```js
rules: [
    {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: [
                    [
                        '@babel/plugin-transform-runtime'
                    ]
                ]
            }
        }
    }
]
```

## 代码分离
此特性能把代码分离到不同的 bundle 中，然后可以按需加载或者并行加载这些文件。代码分离可以带来更小的 bundle，以及控制资源加载的优先级，如果进行合理的使用，会极大提升页面的性能。常用的代码分离的方式有三种：
- 入口起点：使用 entry 配置，手动的分离代码
- 防止重复：使用 Entry dependencies 或者 SplitChunksPlugin 去重和分离 chunk
- 动态导入：通过模块的内联函数调用来分离代码

### 入口起点


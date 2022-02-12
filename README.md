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
配置多入口模式：
```js
entry: {
    index: './src/index.js',
    another: './src/another-module.js',
},

output: {
    filename: '[name].bundle.js', // 输出的文件名
    path: p('dist'), // 打包后的输出文件
    clean: true, // 每次执行打包前清理输出的目录
    assetModuleFilename: 'images/[contenthash][ext]', // 为所有资源模块指定输出的目录和文件名
},
```
会发现如果不同入口文件引入相同依赖，那这个依赖将会被分别打包到各个入口文件中，造成 bundle 过大且重复引用相同依赖的问题。

#### 如何防止重复？
配置如下，这样就可以在多个 chunk 之间共享模块。依赖被打包到了一个单独的文件中
```js
entry: {
    index: {
        import: './src/index.js',
        dependOn: 'shared',
    },
    another: {
        import: './src/another-module.js',
        dependOn: 'shared',
    },
    shared: 'lodash'
},

output: {
    filename: '[name].bundle.js', // 输出的文件名
    path: p('dist'), // 打包后的输出文件
    clean: true, // 每次执行打包前清理输出的目录
    assetModuleFilename: 'images/[contenthash][ext]', // 为所有资源模块指定输出的目录和文件名
},
```

### SplitChunksPlugin
它可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生的 chunk。

```js
optimization: {
    splitChunks: {
        chunks: 'all'
    }
}
```

### 动态导入
- 使用 esm 提供的 `import()` 来实现动态导入。
- 使用 webpack 特定的 `webpack.ensure`。

#### 预获取/预加载模块(prefetch/preload module)

- prefetch(预获取)：将来某些导航下可能需要的资源
- preload(预加载)：当前导航下可能需要资源

添加这个魔法注释后：`webpackPrefetch: true`：在头部可以看到 link:prefetch 字样。然后当点击按钮import该文件时，会发现状态码是304，也就是他已经被提前加载了。

与prefetch 指令相比，preload 指令有许多不同之处：
- preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
- preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
- preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
- 浏览器支持程度不同。

### 缓存技术
浏览器的一种机制：这里的缓存主要指本地缓存（强缓存）
- 将第三方库提取到单独的文件中使用浏览器的强效缓存
- 将自己写的代码通过 webpack 的 contenthash 来根据内容生成hash文件名，以让服务端代码更新时，浏览器的强缓存失效。

## 区分环境
在很多情况下，我们需要区分开发环境和生产环境配置。

### 公共路径

publicPath：通过它指定所有资源的基础路径。

#### 环境变量

webpack 命令行环境配置的 `--env` 参数，可以允许你传入任意数量的环境变量。而在 `webpack.config.js` 中可以访问到这些环境变量。例如，--env production 或 --env goal=local。

`npx webpack --env production`：当将配置写成导出一个函数，函数返回的对象就是一个配置，这个函数接收一个变量 env，env中就存放着在命令行中输入的内容。

`npm install terser-webpack-plugin --save-dev`：使用这个对 js 代码进行压缩。




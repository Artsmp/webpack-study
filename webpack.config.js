const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

// 将路径处理成绝对路径
function p(path) {
    return resolve(__dirname, path)
}

module.exports = {
    // mode: 'development', // 设置 webpack 的编译模式
    mode: 'production',

    devtool: 'inline-source-map', // 此选项控制是否生成，以及如何生成 source map。https://www.webpackjs.com/configuration/devtool/

    entry: './src/index.js',

    output: {
        filename: 'bundle.js', // 输出的文件名
        path: p('dist'), // 打包后的输出文件
        clean: true, // 每次执行打包前清理输出的目录
        assetModuleFilename: 'images/[contenthash][ext]', // 为所有资源模块指定输出的目录和文件名
    },

    module: {
        rules: [
            {
                test: /\.png$/i,
                type: 'asset/resource', // 为资源文件指定使用 asset/resource 模块类型
                generator: {
                    filename: 'assets/img/[contenthash][ext]', // 指定生成之后的文件路径和文件名
                },
            },
            {
                test: /\.svg$/i,
                type: 'asset/inline', // 为资源文件指定使用 asset/inline 模块类型：文件会被转为 data uri（base64）
            },
            {
                test: /\.txt$/i,
                type: 'asset/source', // 为资源文件指定使用 asset/source 模块类型：会获取到文件内容的字符串
            },
            {
                test: /\.jpg$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024
                    }
                }
            },
            {
                test: /\.(css|scss)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack study', // 在模板中使用到的 title 变量
            template: './index.html', // 打包时使用的模板文件
            filename: 'index.html', // 指定打包后的文件名
            inject: 'body', // 让生成的 script 标签插入在 body 中
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[contenthash].css'
        })
    ],

    devServer: {
        static: './dist',
        open: true
    },

    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ],
    },
}
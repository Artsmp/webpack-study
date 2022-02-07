const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 将路径处理成绝对路径
function p(path) {
    return resolve(__dirname, path)
}

module.exports = {
    mode: 'none',

    entry: './src/index.js',

    output: {
        filename: 'bundle.js', // 输出的文件名
        path: p('dist'), // 打包后的输出文件
        clean: true, // 每次执行打包前清理输出的目录
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack study', // 在模板中使用到的 title 变量
            template: './index.html', // 打包时使用的模板文件
            filename: 'app.html', // 指定打包后的文件名
            inject: 'body', // 让生成的 script 标签插入在 body 中
        })
    ]
}
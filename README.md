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
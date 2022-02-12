module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'scripts/[name].js'
  },
  devServer: {
    static: './dist'
  }
}
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: {
    home: './src/index.js'
  },
  watch: true,
  watchOptions: {
    poll: 1000,//每秒询问1000次
    aggregateTimeout: 500,//防抖，500ms
    ignored: /node_modules/ //
  },
  output: {
    //[name]代表home或者other 
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
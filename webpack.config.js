
let path = require('path')
let HtmlWebpackPlugin = require("html-webpack-plugin")
let MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:10].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [//插件使用顺序无先后
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ],
  module: {
    rules: [
      { test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, //抽离出css
          'css-loader',
          'postcss-loader'//个css加前缀，所以要先处理这个后处理css-loader
        ] 
      },
      { test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader',
          'postcss-loader',
          'less-loader'
        ] 
     }
    ]
  }
} 
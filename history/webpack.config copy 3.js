
let path = require('path')
let HtmlWebpackPlugin = require("html-webpack-plugin")
let MiniCssExtractPlugin = require("mini-css-extract-plugin")//用来压缩css文件的时候需要用到optimize-css-assets-webpack-plugin和uglifyjs-webpack-plugin
let OptimizeCss = require("optimize-css-assets-webpack-plugin")
let UglifyJsPlugin = require("uglifyjs-webpack-plugin")
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,//并行打包
        sourceMap: true
      }),
      new OptimizeCss()
    ]
  },
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
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
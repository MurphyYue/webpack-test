
let path = require('path')
let HtmlWebpackPlugin = require("html-webpack-plugin")
let MiniCssExtractPlugin = require("mini-css-extract-plugin")
let OptimizeCss = require("optimize-css-assets-webpack-plugin")
let UglifyJsPlugin = require("uglifyjs-webpack-plugin")
let webpack = require("webpack")
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCss()
    ]
  },
  mode: 'development',
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
    }),
    // new webpack.ProvidePlugin({
    //   $: "jquery"//在每个模块中都注入$
    // })
  ],
  externals: {
    jquery: "$"//引入不打包，在index.html中通过src引入了资源，在模块中依然用import的话，此资源也不参与打包
  },
  module: {
    rules: [
      // {
      //   test:require.resolve("jquery"),//当代码中引入了jQuery的时候
      //   use: 'expose-loader?$'//把$编程全局变量
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env'
          ],
          plugins: [//配置小插件
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose": true }]//用来解析es7语法
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
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
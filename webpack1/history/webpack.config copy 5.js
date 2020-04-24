
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
    // publicPath: 'http://www.xxx.com'//在所有资源路径前都加上这个公共路径
  },
  plugins: [//插件使用顺序无先后
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css'//css下的main.css
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
      {
      test: /\.html$/,
        use: 'html-withimg-loader'//针对在html中直接用<img src='./img.png'/>的方式引用图片
      },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: 'file-loader'//默认会在内部生成一张图片到build目录下，把生成的图片的名字返回回来
      // },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1,//200k 
            outputPath: '/img/',
            esModule: false,
            // publicPath: 'http://www.xxx.com'//只给图片加入这个公共路径
          }
        }//代替file-loader,做一个限制，当图片小于多少k的时候用base64来转化,否则用file-loader产生真是的图片
      },
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
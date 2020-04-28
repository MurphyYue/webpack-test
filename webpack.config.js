let path = require('path')
let HtmlWebpackPlugin = require("html-webpack-plugin")
let webpack = require('webpack')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    hot: ture,
    port: 3000,
    open: true,
    contentBase: './dist'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),//如果从moment中引入了locale的话，就会把它忽略掉，然后手动引入所需要的文件
    new webpack.NamedModulesPlugin(),//打印更新的模块路径
    new webpack.HotModuleReplacementPlugin(),//热更新插件
  ],
  module: {
    noParse: /jquery/,//不去解析jQuery中的依赖库
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,//排除node_modules中的文件，不去解析
        // include: path.resolve('src'),//或者用include属性，指定包含的目录
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
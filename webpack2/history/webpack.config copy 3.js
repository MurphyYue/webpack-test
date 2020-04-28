let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let {CleanWebpackPlugin} = require('clean-webpack-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let webpack = require('webpack')
module.exports = {
  mode: 'production',
  entry: {
    home: './src/index.js'
  },
  devtool: 'source-map',
  devServer: {
    //前端模拟数据
    // before(app){
    //   app.get('/user', (req, res) => {
    //     res.json({name: 'hello world'})
    //   })
    // },
    // proxy: {
    //   '/api': 'http://localhost:3000/'//配置代理到3000端口
    // }
    // proxy: {//通过重写的方式把/api开头的请求代理到目的服务器上 
    //   '/api': {
    //     target: 'http://localhost:3000/',
    //     pathRewrite: {'/api': ''}//去掉/api头
    //   }
    // }
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
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
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
  },
  resolve: {
    modules: [path.resolve('node_modules')],
    extensions: ['.js', '.css', '.json', '.jsx'],//文件引入时省略扩展名的查找顺序
    // mainFields: ['style', 'main']//依赖查询先去找style目录，再去找main目录
    alias: {
      bootstrap: 'bootstrap/dist/css/bootstrap.css'
    }
  }
}
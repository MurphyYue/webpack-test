let path = require('path')
let HtmlWebpackPlugin = require("html-webpack-plugin")
let webpack = require('webpack')
let Happypack = require("happypack")
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    port: 3000,
    open: true,
    contentBase: './dist'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new Happypack({
      id: 'css',
      use: [//多线程打包css时用到的loader
        'style-loader', 'css-loader'
      ]
    }),
    new Happypack({
      id: 'js',
      use: [//多线程打包js时用到的loader
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),//如果从moment中引入了locale的话，就会把它忽略掉，然后手动引入所需要的文件
  ],
  module: {
    noParse: /jquery/,//不去解析jQuery中的依赖库
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,//排除node_modules中的文件，不去解析
        // include: path.resolve('src'),//或者用include属性，指定包含的目录
        use: 'Happypack/loader?id=js'//以js结尾的采用多线程打包
      },
      {
        test: /\.css$/,
        use: 'Happypack/loader?id=css'//以css结尾的采用多线程打包
      }
    ]
  }
}

let path = require('path')
let HtmlWebpackPlugin = require("html-webpack-plugin")
// console.log(path.resolve('dist'))
module.exports = {
  devServer: {//开发服务器配置
    port: 3000,
    progress: true,
    contentBase: './build',
    compress: true, //启用gzip压缩
  },
  mode: 'development',//默认有两种模式，production和development
  entry: './src/index.js',//入口
  output: {
    filename: 'bundle.[hash:10].js',//带hash的文件名,”:[num]“代表hash的长度
    path: path.resolve(__dirname, 'build'),//路径必须是一个绝对路径
  },
  plugins: [//数组，放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html',//"/src/index.html"文件作为打包模板
      filename: 'index.html',//这是指定打包后的名字
      minify: {
        removeAttributeQuotes: true,//去除index.html中的双引号
        collapseWhitespace: true,//折叠空行，变成一行

      },
      hash: true,//生成带hash的文件
    })
  ],
  module: {
    //loader
    rules: [
      //规则：css-loader解析@import这种语法；style-loader，把css插入到head标签中
      //loader的特点是单一功能
      //loader的用法：单个loader只用字符串，多个loader用数组包含
      //loader的执行顺序是从右向左执行
      { test: /\.css$/,
         use: [
          { 
            loader: 'style-loader',
            options: {
              insert: 'top'//style标签会插入到html文件的最上面
            }
          }, 
        'css-loader'
        ] 
      },
      { test: /\.less$/,
        use: [
         { 
           loader: 'style-loader',
           options: {
             insert: 'top'//style标签会插入到html文件的最上面
           }
         }, 
       'css-loader',
       'less-loader'//把less转换成css
       ] 
     }
    ]
  }
} 
// import $ from 'jquery'
// console.log($)//每个模块可以直接使用$
//1)在js中创建图片来引入
import './index.css'
import logo from './display.png'
let image = new Image()
image.src = logo
document.body.append(image)
// let str = require('./a.js')
// console.log(str+"12")
// require('./index.css')
// require('./index.less')
// let fn = () => {
//     console.log('log')
// }
// fn()
// @log
// class A{
//     a=1
// } 
// let a = new A()
// console.log(a.a)
// function log(target) {
//     console.log(target)
// }


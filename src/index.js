// import jquery from 'jquery'
// import moment from 'moment'
// //在这里手动移入所需要的文件
// import 'moment/locale/zh-cn'
// moment.locale('zh-cn')
// let r = moment().endOf('day').fromNow();
// console.log(r)
// import React from 'react'
// import {render} from 'react-dom'
// render(<h1>jsx</h1>, window.root)
// import calc from './test'
// console.log(calc.sum(1,2))

let button = document.createElement('button')
button.innerHTML = 'hello'
button.addEventListener('click', function () {
  // console.log('click')
  //点击按钮时才加载source.js文件
  import('./source.js').then(data => {
    console.log(data)
  })
})

document.body.appendChild(button)
let express = require('express');
let app = new express();
let webpack = require('webpack')

let devMiddle = require('webpack-dev-middleware')

const confg = require('./webpack.base.js');
let compiler = webpack(confg)

app.use(devMiddle(compiler))
app.get('/user', (req, res) => {
  res.json({name: 'hello12'})
})
app.listen(3000) 
/* eslint-disable */
var fs = require('fs')
var path = require('path');
var express = require('express')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var rimraf = require('rimraf')

var app = express()
var config = require('../webpack.config.js')
var compiler = webpack(config)

rimraf.sync('/dist/build/*', { nosort: true, dot: true })

function response(res, content, type) {
  var contentType = type || 'application/json'
  res.set('Content-Type', type + ';charset=UTF-8');
  res.write(content);
  res.end();
}

function mock(res, file) {
  fs.readFile(file, 'utf8', function(err, content) {
    if (err) {
      console.log('err', err)
      response(res, err.message, 'text/html');
      return;
    }
    response(res, content)
  })
}

app.all('/api/*', function(req, res) {
  var filePath = path.resolve(__dirname, '../mocks/' + req.path +'.json')
  console.log(filePath)

  fs.exists(filePath, function(exist) {
    if(exist) {
      mock(res, filePath);
    } else {
      response(res, JSON.stringify({
        errno: 10005,
        error: 'interface not exist',
        request_id: '2017120810425571831',
        data: {}
      }))
    }
  })
});


app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}))

app.use(webpackHotMiddleware(compiler, {
  publicPath: config.output.publicPath,
}))

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});

/* eslint-enable */

/* eslint-disable */
var fs = require('fs')
var path = require('path');
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var historyApiFallback = require('connect-history-api-fallback')
var webpackHotMiddleware = require('webpack-hot-middleware')
var rimraf = require('rimraf')
var opn = require('opn')

var config = require('../webpack.config.js')
var compiler = webpack(config)

rimraf.sync('/dist/build/*', { nosort: true, dot: true })

var server = new WebpackDevServer(compiler, {
  historyApiFallback: false,
  contentBase: path.resolve(__dirname, '../dist'),
  hot: true,
})

var app = server.app

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

app.use(function(req, res, next) {
  var filePath = path.resolve(__dirname, '../mocks/' + req.path +'.json')
  console.log(filePath)
  if (/api/.test(filePath)) {
    fs.exists(filePath, function(exist) {
      if(exist) {
        mock(res, filePath);
      } else {
        response(res, JSON.stringify({
          errno: 10005,
          error: 'interface not exist',
          request_id: +new Date(),
          data: {}
        }))
      }
    })
    return
  }
  next()
});

app.use(historyApiFallback())
app.use(webpackHotMiddleware(compiler))
app.use(server.middleware)

app.listen(3000, function () {
  console.log('app listening on port 3000!\n');
  opn('http://localhost:3000/')
});

/* eslint-enable */

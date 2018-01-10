/* eslint-disable */
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackManifestPlugin = require('webpack-manifest-plugin');
var WebpackChunkHash = require('webpack-chunk-hash');
var webpack = require('webpack');

var isDebug = !process.argv.includes('--release');

var config = {
  entry:{
    index: './src/index',
  },
  output:{
    path: path.resolve(__dirname, "dist/build"),
    filename: isDebug ? '[name].js' : '[name].[chunkHash].js',
    chunkFilename: isDebug ? '[name].js' : '[name].[chunkHash].js',
    publicPath:"/",
  },
  devtool: isDebug ? 'source-map' : false,

  plugins:[
    new HtmlWebpackPlugin({
      template:"./src/index.ejs",
    }),
    new WebpackManifestPlugin(),
    new WebpackChunkHash(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isDebug ? "development" : "production"),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: m => m.context &&
        m.context.includes('node_modules'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
      minChunks: Infinity,
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  module:{
    rules:[
      {
        test:/\.jsx?$/,
        include:path.resolve(__dirname, "src"),
        loader:"babel-loader",
        options:{
          presets:[
            ["env", {modules: false}],
            "react",
            "stage-2",
          ],
          plugins:[
            [
              "import",
              {
                libraryName:"antd",
                style: true,
              },
            ],
            "transform-decorators-legacy",
          ],
        },
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: './tools/postcss.config.js',
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDebug,
              importLoaders: true,
              modules: true,
              localIdentName: isDebug ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
              minimize: !isDebug,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: './tools/postcss.config.js',
            },
          },
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: isDebug ? 10000 : 1000,
        },
      },
    ],
  },
  devServer:{
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
  },
}
function addPlugin(configObj) {
  config.plugins = configObj.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      output: {
        comments: false,
      },
      compress: {
        drop_console: true,
        warnings: false,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin()
    ])
}

if (!isDebug) {
  addPlugin(config)
} else {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.entry.hot = 'webpack-hot-middleware/client'
}

module.exports = config;
/* eslint-enable */

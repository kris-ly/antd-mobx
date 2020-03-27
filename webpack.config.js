/* eslint-disable */
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var TerserPlugin = require('terser-webpack-plugin');
var postcssConfig = require('./tools/postcss.config');
var merge = require('webpack-merge');
var isDebug = !process.argv.includes('--release');
var nodeEnv = isDebug ? 'development' : 'production';

var config = {
  entry:{
    index: './src/index',
  },
  output:{
    path: path.resolve(__dirname, "dist"),
    filename: isDebug ? '[name].js' : '[name].[chunkHash].js',
    chunkFilename: isDebug ? '[name].js' : '[name].[chunkHash].js',
    publicPath:"/",
  },
  mode: nodeEnv,
  devtool: isDebug ? 'source-map' : false,
  optimization: {
    splitChunks: {
      minSize: 244000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',
          priority: 20,
        },
      },
    },
  },

  plugins:[
    new HtmlWebpackPlugin({
      template:"./src/index.ejs",
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || nodeEnv) }),

    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|zh-cn/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    }),
  ],
  module:{
    rules:[
      {
        test:/\.jsx?$/,
        include:path.resolve(__dirname, "src"),
        loader:"babel-loader",
        options:{
          presets:[
            ['@babel/preset-env', {
              modules: false,
              targets: {
                ie: '9',
              },
            }],
            '@babel/preset-react',
          ],
          plugins:[
            ['@babel/plugin-proposal-decorators', {
              decoratorsBeforeExport: false,
            }],
            [
              "import",
              {
                libraryName:"antd",
                style: true,
              },
            ],
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties'
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
            options: postcssConfig,
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          }
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
  }
}

if (!isDebug) {
  config = merge.smart({}, config, {
    plugins: [
      new webpack.ProgressPlugin({
        profile: true,
      }),
    ],
    profile: true,
    devtool: false,
    optimization: {
      mergeDuplicateChunks: true,
      removeAvailableModules: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
      ],
    },
  })
} else {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.plugins.push(new webpack.NamedModulesPlugin())
  config.entry.hot = 'webpack-hot-middleware/client'
}

module.exports = config;
/* eslint-enable */

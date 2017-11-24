
/* eslint-disable no-console, global-require */

const rimraf = require('rimraf');
const webpack = require('webpack');

const bundle = () => {
  rimraf.sync('dist/build/*', { nosort: true, dot: true });
  process.stdout.write('Starting bundle...\n');
  const webpackConfig = require('../webpack.config');
  webpack(webpackConfig).run((err, stats) => {
    if (err) {
      process.stdout.write('bundle failed\n');
      console.log(err);
    } else {
      console.log(stats.toString(webpackConfig.stats));
    }
  });
}

module.exports = bundle();

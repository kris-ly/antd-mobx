const calc = require('postcss-calc');
const presetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    calc(),
    presetEnv({
      browsers: 'chrome >= 29, ie >= 9',
      autoprefixer: true,
      stage: 3,
    }),
  ],
}

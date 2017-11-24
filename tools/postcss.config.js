module.exports = () => ({
  plugins: [
    require('postcss-import')(),
    require('postcss-custom-properties')(),
    require('postcss-custom-media')(),
    require('postcss-media-minmax')(),
    require('postcss-custom-selectors')(),
    require('postcss-nesting')(),
    require('pleeease-filters')(),
    require('pixrem')(),
    require('postcss-flexbugs-fixes')(),
    require('autoprefixer')(),
  ],
});

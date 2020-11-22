const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  // TODO: extract to shared Babel config
  presets: [
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-typescript'),
  ],
});

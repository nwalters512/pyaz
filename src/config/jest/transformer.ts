import babelJest from 'babel-jest';

export = babelJest.createTransformer({
  // TODO: extract to shared Babel config
  presets: [
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-typescript'),
  ],
});

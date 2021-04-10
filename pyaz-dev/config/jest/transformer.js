import babelJest from "babel-jest";
module.exports = babelJest.createTransformer({
  presets: [
    require.resolve("@babel/preset-env"),
    require.resolve("@babel/preset-typescript")
  ]
});

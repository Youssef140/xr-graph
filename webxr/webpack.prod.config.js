const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const common = require("./webpack.common.config");

module.exports = merge(common, {
  node: {
    fs: 'empty'
  },
  // production mode makes it uglyfied/minified
  mode: "production",
  // no weird "eval" stuff, shows code relatively clear in dist/main.js
  devtool: "none",
  entry: {
    vr: "./src/index.js",
    ar: "./src/ar-script.js",
    expression_validation: "./src/components/GraphComponent/MathExpression.js"
  },
  output: {
    // the filename is the name of the bundled file
    filename: "[name].[contentHash].bundle.js",
    // dist is the folder name it gets exported to
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"

  },
  devServer: {
    overlay: {
      warnings: false,
      errors: true
    }
  },
  optimization: {
    minimizer: [new TerserPlugin()]
  },
  // Deletes the dist folder, so the new .js files wont stack and pollute the folder
  plugins: [new HtmlWebpackPlugin({
    favicon: "./src/images/favicon.png",
    chunks: [''],
    template: "./src/index.html",
    filename: "index.html",
    // Injects file in the head of the html
    inject: 'head'
  }),new HtmlWebpackPlugin({
    favicon: "./src/images/favicon.png",
    chunks: ['expression_validation'],
    template: "./src/home.html",
    filename: "home.html",
    // Injects file in the head of the html
    inject: 'head'
  }),new HtmlWebpackPlugin({
    favicon: "./src/images/favicon.png",
    chunks: ['vr'],
    template: "./src/scene.html",
    filename: "scene.html",
    // Injects file in the head of the html
    inject: 'head'
  }),
    new HtmlWebpackPlugin({
      favicon: "./src/images/favicon.png",
      chunks: ['ar'],
      template: "./src/ar.html",
      filename: "ar.html",
      // Injects file in the head of the html
      inject: 'head'
    })]
});
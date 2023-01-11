const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader/lib")

const webpack = require('webpack');
const env = require('./utils/env');
const staticFiles = [
  'manifest.json',
  '128.png',
  'devtools-background.html',
  "devtools.html",
  // 'panel'
].map(file => {
  // if (file === 'panel') {
  //   return {
  //     from: file,
  //     to: 'panel'
  //   }
  // }
  return {
    from: file,
    to: '.'
  }
});
const ASSET_PATH = process.env.ASSET_PATH || '/';
module.exports = {
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      '@front': 'app-frontend/src',
    },
  },
  chromeExtensionBoilerplate: {
    notHotReload: [
      'hook',
      'background',
      'devtools-background',
      'global-hook',
    ],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader'
      // },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ],
  },
  entry: {
    hook: './src/hook.js',
    background: './src/background.js',
    devtools: './src/devtools.js',
    'devtools-background': './src/devtools-background.js',
    'global-hook': './src/global-hook.js', 
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: ASSET_PATH,
    filename: '[name].js',
  },
  devtool: process.env.NODE_ENV !== 'production'
    ? 'inline-source-map'
    : false,
  plugins: [
    new CopyPlugin(
      {
        patterns: staticFiles,
      }
    ),
    new webpack.DefinePlugin({
      BROWSER_TYPE: JSON.stringify(env.BROWSER),
    }),
    new webpack.ProgressPlugin(),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CleanWebpackPlugin({
      verbose: false,
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
  infrastructureLogging: {
    level: 'info',
  },
}

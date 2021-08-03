const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { DllReferencePlugin } = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const developmentConfig = {
  mode: 'development',
  devtool: 'source-map',
  target: 'web',
  output: {
    path: path.join(__dirname, '../public/dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    compress: true, // 启动 gzip 压缩
    progress: true, // 显示打包的进度条
    // ell the server where to serve content from. This is only necessary if you want to serve static files
    // 使用 Dll 动态链接库需要配置，不然 index.html中找不到该 dll 文件地址
    contentBase: path.resolve(__dirname, '../dll'),
    open: 'http://localhost:8080',
    host: '0.0.0.0', // 这样配置可以使其它设备在同一局域网中也能够访问到
    port: 8080,
    hot: true,
    stats: 'errors-only', // 编译时的输出
    historyApiFallback: true // 解决刷新时路由找不到页面报404
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin({
      overlay: false
    }),
    new DllReferencePlugin({
      manifest: require(path.resolve(__dirname, '../dist/react.manifest.json'))
    }),
    new AddAssetHtmlPlugin({
      filepath: path.join(__dirname, '..', 'dll/react.dll.js')
    })
  ]
};

module.exports = merge(common, developmentConfig);

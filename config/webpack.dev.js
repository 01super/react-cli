const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

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
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    // open: true,
    // host: '0.0.0.0', // 这样配置可以使其它设备在同一局域网中也能够访问到
    port: 8080,
    hot: true,
    stats: 'errors-only', // 编译时的输出
    historyApiFallback: true // 解决刷新时路由找不到页面报404
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin()
  ]
};

module.exports = merge(common, developmentConfig);

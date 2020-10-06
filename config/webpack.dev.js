const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

const developmentConfig = {
  mode: 'development',
  output: {
    path: path.join(__dirname, '../public/dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, './'),
    compress: true,
    open: false,
    host: 'localhost', // 0.0.0.0配置可以使其它设备在同一局域网中也能够访问到
    port: 8080,
    hot: true,
    stats: 'errors-only', // 编译时的输出
    historyApiFallback: true // 解决刷新时路由找不到页面报404
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = merge(common, developmentConfig);

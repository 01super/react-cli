const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const productionConfig = {
  mode: 'production',
  target: 'browserslist',
  output: {
    path: path.resolve(__dirname, '../dist'), // 绝对路径，不设置会导致CleanWebpackPlugin插件失效
    filename: '[name].bundle.[chunkhash:7].js'
  },
  plugins: [new CleanWebpackPlugin()]
};

module.exports = merge(common, productionConfig);

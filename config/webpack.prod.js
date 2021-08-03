const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const productionConfig = {
  mode: 'production',
  target: 'browserslist',
  output: {
    path: path.resolve(__dirname, '../dist'), // 绝对路径，不设置会导致CleanWebpackPlugin插件失效
    filename: '[name].bundle.[chunkhash:7].js'
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    runtimeChunk: 'single',
    // '...' can be used in optimization.minimizer to access the defaults.
    // 如果不使用 ... ，Allows you to override the default minimizer by providing a different one or more customized TerserPlugin instances.
    minimizer: [new CssMinimizerPlugin(), '...'],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
      maxInitialRequests: 4, // 最大初始化请求数，该属性决定入口最多分成的代码块数量，太小的值会使你无论怎么分割，都无法让入口的代码块变小。
      automaticNameDelimiter: '~', // 打包分割符
      // name: !isDevMode, // 值为 false 时，适合生产模式使用，webpack 会避免对 chunk 进行不必要的命名，以减小打包体积
      cacheGroups: {
        defaultVendors: {
          // 项目基本框架等
          chunks: 'all',
          // 将react-refresh\/runtime包含在其中是为了pmmmwh/react-refresh-webpack-plugin的热重载功能在bundle splitting下得以实现，详见链接：
          // https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/TROUBLESHOOTING.md#component-not-updating-with-bundle-splitting-techniques
          test: /(react|react-dom|react-router-dom)/,
          priority: 100,
          name: 'vendors'
        },
        'async-commons': {
          // 异步加载公共包、组件等
          chunks: 'async',
          minChunks: 2, // 引用次数
          name: 'async-commons',
          priority: 90
        },
        antd: {
          chunks: 'all',
          test: /antd/,
          minChunks: 1,
          name: 'antd',
          priority: 110
        },
        commons: {
          // 其他同步加载公共包
          chunks: 'all',
          minChunks: 2,
          name: 'commons',
          priority: 80
        }
        // default: false
      }
    }
  }
};

module.exports = merge(common, productionConfig);

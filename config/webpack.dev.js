const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { DllReferencePlugin } = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');

const developmentConfig = {
  mode: 'development',
  devtool: 'source-map',
  target: 'web',
  cache: {
    type: 'filesystem' // 使用文件缓存
  },
  output: {
    path: path.join(__dirname, '../public/dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  devServer: {
    // progress: true, // 显示打包的进度条
    open: 'http://localhost:666',
    host: '0.0.0.0', // 这样配置可以使其它设备在同一局域网中也能够访问到
    port: 666,
    historyApiFallback: true, // 解决刷新时路由找不到页面报404
    devMiddleware: {
      // index: true,
      // mimeTypes: {"text/html": ["phtml"]},
      // publicPath: "/publicPathForDevServe",
      // serverSideRender: true,
    },
    client: {
      // Can be used only for `errors`/`warnings`
      logging: 'info',
      //
      // overlay: {
      //   errors: true,
      //   warnings: true,
      // }
      overlay: false,
      progress: true
    },
    static: {
      // directory: path.resolve(__dirname, "static"),
      // staticOptions: {},
      // Don't be confused with `devMiddleware.publicPath`, it is `publicPath` for static directory
      // Can be:
      // publicPath: ['/static-public-path-one/', '/static-public-path-two/'],
      // publicPath: "/static-public-path/",
      // Can be:
      // serveIndex: {} (options for the `serveIndex` option you can find https://github.com/expressjs/serve-index)
      // serveIndex: true,
      // Can be:
      // watch: {} (options for the `watch` option you can find https://github.com/paulmillr/chokidar)
      // watch: true,
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // Cleans your terminal output during development to only show the latest build information.
    new CleanTerminalPlugin(),
    new ReactRefreshWebpackPlugin({
      overlay: false
    }),
    new DllReferencePlugin({
      manifest: require(path.resolve(__dirname, '../dll/react.manifest.json'))
    }),
    new AddAssetHtmlPlugin({
      filepath: path.join(__dirname, '..', 'dll/react.dll.js')
    })
  ]
};

module.exports = merge(common, developmentConfig);

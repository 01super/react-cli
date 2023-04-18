const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevMode = process.env.NODE_ENV === 'development';

module.exports = {
    entry: './src', // 虽然webpack默认是此配置，但是不能删除，不然HMR会不工作
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'), // 配置别名，方便引入
        },
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [isDevMode && require.resolve('react-refresh/babel')].filter(
                            Boolean,
                        ),
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, // 超过限制大小，会由file-loader去处理，所以需要安装file-loader
                        },
                    },
                ],
            },
            {
                test: /\.(le|c)ss$/,
                exclude: /node_modules/, // 排除node_modules文件夹下面的样式文件
                use: [
                    isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                auto: (resourcePath) => !/global.(css|less)$/i.test(resourcePath),
                                localIdentName: isDevMode
                                    ? '[local]__[hash:base64]'
                                    : '[hash:base64]',
                            }, // 开启css modules
                            importLoaders: 2, // css-loader前的loader数量
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')({
                                        // 给css属性加上浏览器前缀
                                        overrideBrowserslist: [
                                            'last 10 Chrome versions',
                                            'last 5 Firefox versions',
                                            'Safari >= 6',
                                            'ie > 9',
                                            '> 2%',
                                        ],
                                    }),
                                ],
                            },
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(le|c)ss$/,
                include: /node_modules/, // 排除node_modules文件夹下面的样式文件
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new WebpackBar(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css',
        }),
        /** copy-webpack-plugin */
        // new CopyWebpackPlugin({
        //   patterns: [
        //     {
        //       from: path.resolve(__dirname, '../public'),
        //       to: path.resolve(__dirname, '../dist')
        //     }
        //   ]
        // })
    ],
};

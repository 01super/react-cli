const path = require('path');
const { DllPlugin } = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        // 把 react 相关的模块都放在一个单独的动态链接库
        react: ['react', 'react-dom', 'react-router-dom'],
    },
    output: {
        // 输出的动态链接库的名称，[name] 代表当前动态链接库的名称
        // 也就是 entry 中配置的 react
        filename: '[name].dll.js',
        path: path.resolve(__dirname, '../dll'),
        // 存放动态链接库的全局变量名称，例如对应 react 来说就是 _dll_react
        // 之所以在前面加 _dll_，是为了防止全局变量冲突
        library: '_dll_[name]',
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new DllPlugin({
            // 动态链接库的全局变量名称，要和 output.library 中保持一致
            // 改字段的值也就是输出的 manifest.json 文件中的 name 字段的值
            // 例如 react.manifest.json 中就有 "name": "_dll_react"
            name: '_dll_[name]',
            path: path.resolve(__dirname, '../dll/[name].manifest.json'),
            format: true,
            entryOnly: true,
        }),
    ],
};

module.exports = {
  //预设执行顺序从后往前
  //plugins执行顺序从前往后
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript'
    // {
    //   development: process.env.BABEL_ENV === "development",
    // },
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'antd',
        style: 'css', // 为true会加载less文件，当需要配置antd主题的时候要改为true
        libraryDirectory: 'es'
      }
    ],
    ['@babel/plugin-proposal-decorators', {
      legacy: true,
      decoratorsBeforeExport: true
    }],
    ['@babel/plugin-proposal-class-properties', { 'loose': true }],
    '@babel/plugin-transform-runtime'
  ]
};

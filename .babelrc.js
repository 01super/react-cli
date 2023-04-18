module.exports = {
    //预设执行顺序从后往前
    //plugins执行顺序从前往后
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                corejs: {
                    version: 3,
                    proposals: true,
                },
                modules: false,
            },
        ],
        ['@babel/preset-react', { runtime: 'automatic' }],
        '@babel/preset-typescript',
        // {
        //   development: process.env.BABEL_ENV === "development",
        // },
    ],
    plugins: [
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true,
            },
        ],
        ['@babel/plugin-proposal-class-properties', { loose: false }],
    ],
};

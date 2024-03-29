module.exports = {
    //指定代码的运行环境
    env: {
        browser: true,
        node: true,
        es6: true, // 额外支持新的 ES6 全局变量, 如Set和Map
    },
    extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'prettier',
        'plugin:react/jsx-runtime',
    ],
    parser: '@typescript-eslint/parser', // ESLint的解析器，用于解析typescript，从而检查和规范Typescript代码
    settings: {
        react: {
            pragma: 'React',
            version: 'detect',
        },
    },
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
        allowImportExportEverywhere: true,
        tsconfigRootDir: __dirname,
        ecmaVersion: 12, // 指定想要使用的 ECMAScript 版本
        ecmaFeatures: {
            jsx: true, //指定ESLint可以解析JSX语法
        },
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        'import/extensions': 'off',
        'react/function-component-definition': 'off',
        'arrow-body-style': 'off'
        // 'no-unused-vars': ['error', { varsIgnorePattern: 'React' }],
    },
};

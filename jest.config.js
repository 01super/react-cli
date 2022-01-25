const path = require('path');
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: false,
    rootDir: path.join(__dirname, 'src'),
    moduleNameMapper: {
        //   解决jest找不到webpack中设置的alias别名的问题
        '^@/(.*)$': '<rootDir>/$1',
    },
    collectCoverageFrom: ['**/*.{js,ts,tsx}', '!**/node_modules/**', '!**/vendor/**'],
};

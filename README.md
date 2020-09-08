# 从零搭建基于 Webpack4+Babel7+TypeScrip 的 React 开发环境

**功能要点：**

- 配置基础的 webpack 功能
  - 自动生成打包后与打包文件关联的 html 文件
  - 每次打包前自动清理上一次的打包文件
  - 配置 devServer
  - 配置热重载 HMR
  - 配置文件处理 loader(图片、css 以及其他静态资源文件)
  - 拆分 webpack 的开发和打包的配置文件
- 支持 react(配置 babel 解析 react)，解析 class 组件中的箭头函数
- 支持 typescript(配置 babel 解析 typescript)
- 支持 less 并且做 css 样式兼容(加浏览器前缀 postcss)和 css 模块化
- 优化 webpack 打包(配置 splitChunks)
- commit 提交规范
- eslint 代码检测和 prettier 代码格式化统一项目代码风格
- jest 测试

## 先让 webpack 跑起来

1. 初始化项目，安装 webpack 所需依赖

   webpack 4.x 版本需同时安装 webpack webpack-cli

   ```shell
    npm init -y
    npm install --save-dev webpack-cli webpack
   ```

2. 搭建项目目录结构

   ```text
   |-- webpack-cli
    |-- config        webpack配置文件目录
    |-- dist          webpack打包文件地址
    |-- package.json
    |-- src           源代码文件夹
    |   |-- index.js
    |   |-- index.html

   ```

3. 在 src 文件夹下建一个最基本的 html 文件，在 index.js 中输入以下代码来测试

   ```JavaScript
   console.log("test webpack")
   ```

4. 在项目根目录下输入以下命令来打包

   ```shell
   ./node_modules/.bin/webpack
   ```

   此时可以在 dist 文件下看见 main.js 文件，把它通过 script 标签引入到 src/index.html 中，  
   `<script src="../dist/main.js"></script>`  
   然后用浏览器打开 index.html 文件，就可以在控制台看到 “test webpack” 输出说明打包文件成功

## 使用自定义的 webpack 配置文件来控制 webpack 的打包行为

1. 在 config 文件中的 index.js 中输入一下代码

   ```JavaScript
    const path = require('path');
    module.exports = {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'main.js'
        }
    };
   ```

   并且在 pakage.json 中的 script 命令中添加如下配置：  
    "build": "webpack --config config/index.js"  
    然后执行 npm run build 命令来进行打包，也会得到差不多的结果

2. 使用[html-webpack-plugin](https://www.webpackjs.com/plugins/html-webpack-plugin/)插件来自动生成 html 文件，此时可以删除 src 下的 index.html 文件

3. 使用[clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)来自动清理打包文件

## 添加 react

1. 添加 react 的依赖：`npm i react react-dom react-router-dom`

2. 此时编写 react 代码还不能正常工作，因为还不能解析 react(jsx 语法)。  
   引入 babel 来解析 jsx 语法  
   babel 的[核心依赖](https://babeljs.io/docs/en/usage)：`npm install --save-dev @babel/core @babel/cli @babel/preset-env`  
   转换 react 的依赖[@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react#babelrcjs)： `npm install --save-dev @babel/preset-react babel-loader`  
   再在根目录下添加.babelrc.js 配置文件：

   ```javascript
   module.exports = {
     presets: [['@babel/preset-react']]
   };
   ```

   最后在 webpack 配置中 module 增加 babel-loader:

   ```javascript
   module: {
     rules: [
       {
         test: /\.js$/,
         exclude: /node_modules/,
         use: {
           loader: 'babel-loader',
           options: {
             presets: ['@babel/preset-env']
           }
         }
       }
     ];
   }
   ```

   此时运行打包命令，然后打开 dist 文件夹下的 index.html 就会发现 react 已经正常开始工作了

## 使用 webpack 的[DevServer](https://github.com/webpack/webpack-dev-server)来便捷开发项目

1. 安装 webpack-dev-server:`npm install webpack-dev-server --save-dev`

2. 在 webpack 配置文件中添加如下配置：

   ```JavaScript
     devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8080,
    }
   ```

3. 在 package.json 中的 scripts 中新增命令：  
   `"dev": "webpack-dev-server --config config/index.js"`  
   此时，在浏览器中打开 localhost:8080 就可以进行所写即所见的开发了

## 添加 typescript 支持

1. 安装依赖`npm i -D @babel/preset-typescript typescript`

2. 在.babel.js 中的 presets 中添加`@babel/preset-typescript`  
   同时在命令行工具中输入`tsc --init`来生成 typescript 的配置文件  
   在其配置文件中的 compilerOptions 中添加`jsx": "preserve`配置
   目的是禁用 ts 的转 react 而使用 babel

3. 在 webpack 配置文件中新增配置，使 webpack 能处理 ts、tsx 文件：

   ```javascript
   entry: "./src/index",
   resolve: {
           extensions: [".ts", ".tsx", ".js"],
   },
   module: {
       rules: [
           {
               test: /\.(js|ts|tsx)$/,
               exclude: /node_modules/,
               use: {
               loader: "babel-loader",
               },
           },
       ],
   },
   ```

   此时就可以将 src 目录下的文件改为 ts 或 tsx 文件了，改完之后会发现一个问题，react 组件的 tsx 文件的 import 语句很多都出现了 ts 报错，这是因为 react 等库没有引入声明文件导致，引入对应的库的声明文件即可解决：  
   `npm i -D @types/react @types/react-dom @types/react-router-dom`

## 处理静态资源

1. 现在通过 import 图片然后将值赋值的 img 的 src 属性时还不能正确处理  
   所以需要 loader 对图片文件(不仅能处理图片文件，还能处理字体、视屏、音频等文件)进行处理，  
   这里我们使用[url-loader](https://github.com/webpack-contrib/url-loader)：`npm i url-loader file-loader -D`  
   file-loader 和 url-loader 的区别：
   - file-loader: 对静态资源进行处理，打包时将对应的文件打包到指定的文件夹，以便网页能够找到正确的资源文件
   - url-loader: 包含了 file-loader,但是还能将文件转换成 base64 编码嵌入到代码中，这样就可以减少 http 请求  
     **注意：** 只适合将小文件 base64 化，url-loader 包含了 file-loader，使用 url-loader 同时还需安装 file-loader  
     按照文档对 webpack 进行修改后便可以支持文件的引入了

## [jest](https://jestjs.io/)测试

1. 安装 jest，babel-jest,@types/jest，再添加 jest.config.js 配置文件：

   ```javascript
   module.exports = {
     collectCoverage: false,
     rootDir: path.join(__dirname, 'src'),
     moduleNameMapper: {
       '^@/(.*)$': '<rootDir>/$1'
     },
     collectCoverageFrom: ['**/*.{js,ts,tsx}', '!**/node_modules/**', '!**/vendor/**']
   };
   ```

   就可以在**tests**文件夹下建立测试文件进行测试，也可以通过配置 testMatch 去自定义测试文件的路径。测试 react 的 DOM 可以使用 enzyme 库

## 支持[less](https://webpack.js.org/loaders/less-loader/)

1. 安装依赖`npm install less less-loader --save-dev`  
   **babel 的 presets 和 webpack 的 loader 的执行顺序都是从后往前执行**  
   按照文档编辑好 webpack 的配置之后，添加 less 文件来测试，会发现还是无法处理 less 文件，  
   这是因为虽然此时 webpack 能够将 less 转为 css，但是 webpack 还不能处理 css 文件
2. 安装 css-loader 和 style-loader 来处理 css 文件：  
    `npm install style-loader css-loader --save-dev`  
    然后修改 webpack 配置，在处理 less 文件的 loader 中增加 css-loader 和 style-loader  
    需要注意 loader 的顺序，添加完成后，重新启动项目，此时就能够支持 less 文件了。  
   3.使用[postcss-loader](https://github.com/webpack-contrib/postcss-loader) + [autoprefixer](https://github.com/postcss/autoprefixer#readme)来让的 css 兼容更多的浏览器,autoprefixer 插件会自动在需要兼容的 css 属性前面加上浏览器前缀。  
   4.开启 css modules，防止各个页面间的 css，在 css-loader 中的 options 配置 modules: true

## 代码约束

1. ESLint 检查

   - 按照[eslint](https://eslint.org/docs/user-guide/getting-started)官网的介绍安装并初始化 eslint 的配置文件
   - 在 ts 项目中必须执行解析器为@typescript-eslint/parser，才能正确的检测和规范 TS 文件,  
      所以需要在 eslint 配置文件中将 parser 指定为`@typescript-eslint/parser`,同时使用安装它的依赖  
      `npm install -D @typescript-eslint/parser`
   - 必须配置 eslint 中的 parserOptions 来指定需要支持的 js 特性
   - 根据自己需求来配置 eslint 中的[rules](https://eslint.org/docs/rules/)
   - 在项目根路径下添加.eslintignore 文件来忽略不需要 eslint 来检查的文件
   - 在 package.json 中添加命令：  
      `"lint": "eslint --ext .ts,.tsx,.js src",`  
      `"lint:fix": "eslint --ext .ts,.tsx,.js src --fix",`  
      第一个命令是运行检测代码是否有错误，第二个可以检测，并修复代码中的一些错误

2. 结合 Prettier 和 ESLint 来规范代码[eslint-config-prettier](eslint-config-prettier)
   - 首先安装依赖`npm i -D prettier eslint-config-prettier eslint-plugin-prettier`
     - eslint-config-prettier：解决 ESLint 中的样式规范和 prettier 中样式规范的冲突，以 prettier 的样式规范为准，使 ESLint 中的样式规范自动失效
     - eslint-plugin-prettier：将 prettier 作为 ESLint 规范来使用
   - 在项目的根目录下创建.prettierrc.js 配置文件文件根据自己的风格来配置代码的格式
   - 修改 eslint 配置文件,在其中添加`plugins: ["prettier"], extends: ["plugin:prettier/recommended", "prettier/react"]`
   - 检查 typescript 文件的错误[typescript-eslint](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)
   - 使用常用的 Airbnb 规范：[eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)

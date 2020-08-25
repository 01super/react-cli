# 小白教你从零搭建基于Webpack4+Babel7+TypeScrip的React开发环境  

## 先让你的webpack跑起来  

1. 初始化项目，安装webpack所需依赖

    webpack 4.x 版本需同时安装webpack webpack-cli  

   ```  shell
    npm init -y
    npm install --save-dev webpack-cli webpack  
   ```

2. 搭建项目目录结构  

   ``` text
   |-- webpack-cli
    |-- config        webpack配置文件目录
    |-- dist          webpack打包文件地址
    |-- package.json
    |-- src           源代码文件夹
    |   |-- index.js
    |   |-- index.html

   ```

3. 在src文件夹下建一个最基本的html文件，在index.js中输入以下代码来测试  

    ``` JavaScript
    console.log("test webpack")
    ```  

4. 在项目根目录下输入以下命令来打包  

   ``` shell
   ./node_modules/.bin/webpack
   ```

    此时可以在dist文件下看见main.js文件，把它通过script标签引入到src/index.html中，  
   `<script src="../dist/main.js"></script>`  
   然后用浏览器打开index.html文件，就可以在控制台看到 “test webpack” 输出说明打包文件成功  

## 使用自定义的webpack配置文件来控制webpack的打包行为  

1. 在config文件中的index.js中输入一下代码  

   ``` JavaScript
    const path = require('path');
    module.exports = {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'main.js'
        }
    };
   ```

    并且在pakage.json中的script命令中添加如下配置：  
    "build": "webpack --config config/index.js"  
    然后执行npm run build命令来进行打包，也会得到差不多的结果

2. 使用[html-webpack-plugin](https://www.webpackjs.com/plugins/html-webpack-plugin/)插件来自动生成html文件，此时可以删除src下的index.html文件  

3. 使用[clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)来自动清理打包文件  

## 添加react  

1. 添加react的依赖：`npm i react react-dom react-router-dom`  

2. 此时编写react代码还不能正常工作，因为还不能解析jsx语法。引入babel来解析jsx语法  
   `npm install babel-loader babel-core babel-preset-env`  

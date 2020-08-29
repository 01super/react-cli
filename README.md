# 从零搭建基于Webpack4+Babel7+TypeScrip的React开发环境  

**功能要点：**  

- 配置基础的webpack功能  
  - 自动生成打包后与打包文件关联的html文件  
  - 每次打包前自动清理上一次的打包文件  
  - 配置devServer  
  - 配置热重载HMR  
  - 配置文件处理loader(图片、css以及其他静态资源文件)  
  - 拆分wenpack的开发和打包的配置文件
- 支持react(配置babel解析react)，解析class组件中的箭头函数
- 支持typescript(配置babel解析typescript)  
- 支持less并且做css样式兼容(加浏览器前缀postcss)和css模块化  
- 优化webpack打包(配置splitChunks)  
- commit提交规范  
- eslint代码检测和prettier代码格式化统一项目代码风格  
- jest测试

## 先让webpack跑起来  

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

2. 此时编写react代码还不能正常工作，因为还不能解析react(jsx语法)。  
   引入babel来解析jsx语法  
   babel的[核心依赖](https://babeljs.io/docs/en/usage)：`npm install --save-dev @babel/core @babel/cli @babel/preset-env`  
   转换react的依赖[@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react#babelrcjs)： `npm install --save-dev @babel/preset-react babel-loader`  
   再在根目录下添加.babelrc.js配置文件：  

   ``` javascript
   module.exports = {
        presets: [
            [
            "@babel/preset-react",
            ],
        ],
    };
   ```

   最后在webpack配置中module增加babel-loader:  

    ``` javascript
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
        ]
    }
    ```

    此时运行打包命令，然后打开dist文件夹下的index.html就会发现react已经正常开始工作了  

## 使用webpack的[DevServer](https://github.com/webpack/webpack-dev-server)来便捷开发项目  

1. 安装webpack-dev-server:`npm install webpack-dev-server --save-dev`  

2. 在webpack配置文件中添加如下配置：  

   ``` JavaScript
     devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8080,
    }
    ```

3. 在package.json中的scripts中新增命令：  
`"dev": "webpack-dev-server --config config/index.js"`  
此时，在浏览器中打开localhost:8080就可以进行所写即所见的开发了

## 添加typescript支持  

1. 安装依赖`npm i -D @babel/preset-typescript typescript`  

2. 在.babel.js中的presets中添加`@babel/preset-typescript`  
    同时在命令行工具中输入`tsc --init`来生成typescript的配置文件  
    在其配置文件中的compilerOptions中添加`jsx": "preserve`配置
    目的是禁用ts的转react而使用babel

3. 在webpack配置文件中新增配置，使webpack能处理ts、tsx文件：  

    ``` javascript
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

    此时就可以将src目录下的文件改为ts或tsx文件了，改完之后会发现一个问题，react组件的tsx文件的import语句很多都出现了ts报错，这是因为react等库没有引入声明文件导致，引入对应的库的声明文件即可解决：  
    `npm i -D @types/react @types/react-dom @types/react-router-dom`

## 处理静态资源  

1. 现在通过import图片然后将值赋值的img的src属性时还不能正确处理  
    所以需要loader对图片文件(不仅能处理图片文件，还能处理字体、视屏、音频等文件)进行处理，  
    这里我们使用[url-loader](https://github.com/webpack-contrib/url-loader)：`npm i url-loader file-loader -D`  
    file-loader和url-loader的区别：  
    - file-loader: 对静态资源进行处理，打包时将对应的文件打包到指定的文件夹，以便网页能够找到正确的资源文件  
    - url-loader: 包含了file-loader,但是还能将文件转换成base64编码嵌入到代码中，这样就可以减少http请求  
    **注意：** 只适合将小文件base64化，url-loader包含了file-loader，使用url-loader同时还需安装file-loader  
    按照文档对webpack进行修改后便可以支持文件的引入了

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "../dist"), // 绝对路径
    filename: "main.js",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"), // 配置别名，方便引入
    },
  },
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
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
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
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true, // 开启css modules
              importLoaders: 2, // css-loader前的loader数量
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")({
                  // 给css属性加上浏览器前缀
                  overrideBrowserslist: [
                    "last 10 Chrome versions",
                    "last 5 Firefox versions",
                    "Safari >= 6",
                    "ie > 9",
                    "> 2%",
                  ],
                }),
              ],
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    host: "0.0.0.0", // 这样配置可以使其它设备在同一局域网中也能够访问到
    port: 8080,
  },
};

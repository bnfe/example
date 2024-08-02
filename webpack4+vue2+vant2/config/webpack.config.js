const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const getClientEnvironment = require("./env");
const env = getClientEnvironment();

const resolve = (dir) => path.resolve(__dirname, "..", dir);

// 打包排除某些依赖
const externals = {
  vue: "Vue",
  vuex: "Vuex",
  "vue-router": "VueRouter",
  axios: "axios",
  vant: "vant",
};

// cdn资源
const cdn = {
  // 开发环境
  dev: {
    css: ["https://cdn.jsdelivr.net/npm/vant@2.12/lib/index.css"],
    js: ["https://cdn.jsdelivr.net/npm/eruda@2.4/eruda.min.js"],
  },
  // 生产环境
  build: {
    css: ["https://cdn.jsdelivr.net/npm/vant@2.12/lib/index.css"],
    js: [
      "https://cdn.jsdelivr.net/npm/vue@2.6/dist/vue.min.js",
      "https://cdn.jsdelivr.net/npm/vuex@3.6/dist/vuex.min.js",
      "https://cdn.jsdelivr.net/npm/vue-router@3.5/dist/vue-router.min.js",
      "https://cdn.jsdelivr.net/npm/axios@0.19/dist/axios.min.js",
      "https://cdn.jsdelivr.net/npm/vant@2.12/lib/vant.min.js",
    ],
  },
};

const config = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    base: ["core-js/stable", "regenerator-runtime/runtime"],
    main: [resolve("src/main.js")],
  },
  output: {
    filename: "js/[name].[hash:8].js",
    path: resolve(process.env.OUTPUT_DIR || "dist"),
  },
  resolve: {
    modules: [resolve("src"), "node_modules"],
    alias: {
      "@": resolve("src"),
      "~": resolve(""),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx", ".vue", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader",
        },
      },
      {
        test: /\.jsx?$/, //适配js和jsx
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(css|scss)$/,
        //loader是有顺序的，从后往前
        use: [
          process.env.NODE_ENV === "production" ? MiniCssExtractPlugin.loader : "style-loader", //在页面插入css样式
          "css-loader", // 抽取css样式
          "postcss-loader", // 样式前缀自动补全
          // "sass-loader", // sass当做css技术栈
          {
            loader: "sass-loader", // sass当做css技术栈
            options: {
              additionalData: "@import '@/styles/index.scss';",
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        //use使用一个loader可以用对象，字符串，两个loader需要用数组
        use: {
          loader: "file-loader",
          //options额外的配置，比如资源名称
          options: {
            //placeholder 占位符 [name]老资源模块的名称 [ext]老资源模块的后缀
            name: "[name].[hash:8].[ext]",
            //打包后存放的位置
            outputPath: "img",
            esModule: false,
          },
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash:8].[ext]",
            outputPath: "font",
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "", //标题
      filename: "index.html", // 输出的文件名，默认是index.html
      template: "public/index.html", // 模板文件路径
      favicon: "public/favicon.ico",
      minify:
        process.env.NODE_ENV === "production"
          ? {
              //压缩HTML文件
              removeComments: true, // 移除HTML中的注释
              collapseWhitespace: true, // 删除空白符和换行符
            }
          : false,
      cdn: process.env.NODE_ENV === "production" ? cdn.build : cdn.dev,
    }),
    new InterpolateHtmlPlugin(env.raw),
    new webpack.DefinePlugin(env.stringified),
    new VueLoaderPlugin(),
  ],
  externals: process.env.NODE_ENV === "production" ? externals : {},
};

module.exports = config;

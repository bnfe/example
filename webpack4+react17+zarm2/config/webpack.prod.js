const path = require("path");
const { merge } = require("webpack-merge");
const conf = require("./webpack.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const resolve = (dir) => path.resolve(__dirname, "..", dir);

const config = merge(conf, {
  // mode: "production",
  optimization: {
    usedExports: true, //哪些导出的模块被使用了，再做打包
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
            pure_funcs: ["console.log"], // 移除console
          },
        },
        parallel: true, //启用多进程
      }),
    ],
    splitChunks: {
      chunks: "all", //所有的chunks代码公共部分分离出来成为一个单独的文件
      cacheGroups: {
        //缓存组
        react: {
          test: /react|react-dom/,
          name: "react",
          minChunks: 1,
        },
      },
    },
  },
  plugins: [
    new OptimizeCssAssetsPlugin({
      //压缩css
      cssProcessor: require("cssnano"), //引入cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: { removeAll: true },
      },
    }),
    new MiniCssExtractPlugin({
      //提取css为单独文件
      filename: "css/[name].[contenthash:8].css",
    }),
    new CleanWebpackPlugin({
      //打包之前清理一次
      cleanOnceBeforeBuildPatterns: [resolve(process.env.OUTPUT_DIR || "dist")],
    }),
  ],
});

module.exports = config;

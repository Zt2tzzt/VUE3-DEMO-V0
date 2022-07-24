/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-10-02 16:38:44
 * @LastEditors: ZeT1an
 * @LastEditTime: 2022-02-12 14:55:08
 * @LastEditContent: 
 */
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 无需安装
const { DefinePlugin } = require('webpack')

module.exports = {
  // 设置模式，开发，生产两个模式
  mode: 'development',
  // 设置source-map，建立JS映射文件，方便调试错误。
  devtool: 'source-map',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 正则表达式
        // loader: 'css-loader', // 一种语法糖
        use: [
          // { loader: 'css-loader' } // 完整写法
          'style-loader',
          'css-loader', // 省略写法
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      // webpack5之后不推荐
      /* {
        test: /\.(jpg|png|gif|svg|jpeg)$/,
        use: {
          loader: 'file-loader',
          options: {
            // outputPath: 'img',
            name: 'img/[name]_[hash:6].[ext]'
          }
        }
      }, */
      // webpack5之后不推荐
      /* {
        test: /\.(jpg|png|gif|svg|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            // outputPath: 'img',
            name: 'img/[name]_[hash:6].[ext]',
            limit: 100 * 1024
          }b
        }
      }, */
      // webpack5之后，用 asset module type 来打包资源
      {
        test: /\.(jpg|png|gif|svg)$/,
        type: 'asset',
        generator: {
          filename: "img/[name]_[hash:6][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024
          }
        }
      },
      /* {
        test: /\.(eot|ttf|woff2?)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'font/[name]_[hash:6].[ext]'
          }
        }
      } */
      {
        test: /\.(eot|ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name]_[hash:6][ext]'
        }
      }
    ]
  },
  plugins: [
    // 一个个的插件对象
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: '哈哈哈'
    }),
    new DefinePlugin({
      BASE_URL: '"./"'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: './public',
          globOptions: {
            ignore: [
              '**/index.html'
            ]
          }
        }
      ]
    })
  ]
}

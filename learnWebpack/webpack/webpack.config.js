const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  mode:'development', // 开发模式
  entry: path.resolve(__dirname,'../src/main.js'),    // 入口文件
  // entry: ["@babel/polyfill", path.resolve(__dirname,'../src/main.js')],
  output: { // 出口
    filename: '[name].[hash:8].js',      // 打包后的文件名称
    path: path.resolve(__dirname,'../dist'),  // 打包后的目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new CleanWebpackPlugin(),
    new ExtractTextPlugin("css/style.[hash:8].css"),
  ],
  module: {
    rules: [
      {
        test: /\.css|.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', { 
            loader: 'postcss-loader', 
              options: {
                plugins: [
                  require('autoprefixer') ({
                    // 要适配的浏览器
                    overrideBrowserslist: [
                      "defaults",
                      "not ie < 11",
                      "last 2 versions",
                      "> 1%",
                      "iOS 7",
                      "last 3 iOS versions"
                    ]
                  })
                ]
              }
            },
            'less-loader'
          ]
        })      
      }, 

      {
        test: /\.(jpeg|jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[hash:8].[ext]',
          publicPath: '../images/',
          outputPath: 'images/',
          esModule: false // 启用CommonJS模块语法
        }
      },

      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },

    ]
  }
}

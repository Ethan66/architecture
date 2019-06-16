const path = require('path')
const entry = require('./entry') // 方法二：入口作为单独文件引入，方便配置入口文件，以防被修改
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成html文件插件
// node.js的文件模块，在node.js启动的时候已经加载了文件模块，所以可以制定相应路径
module.exports = {
  context: path.resolve(process.cwd(), 'src'),
  // 手动编译webpack的编译上下文，这样输入文件就不用写'./src/app/sale.js'，只要书写为'./app/sale.js'

  // 方法一
  /* entry: { // 输入文件
    sale: './sale.js'
  }, */

  // 方法二
  entry: entry,

  output: { // 导出到哪里
    publicPath: '/dist', // 给webpack做一个路由路径
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].js' // 导出的文件名命名
    // 因为用到了绝对路径，所以引入了path
    // process.cwd(), node.js的启动目录
    // node.js的启动目录：就是项目根目录，跟npm run的启动目录是一样的
  },
  mode: 'development',

  plugins: [
    new ExtractTextPlugin("css/[name].css"),
    // 用插件将引入到js中的css拿出来，打包放到css文件夹下
    new HtmlWebpackPlugin({
      title: 'My', // 生成的html标题
      template: 'base/webpack.template.html', // 生成的html的所需要的模板
      chunks: ['sale', 'list'], // 生成html所需要的js和css的webpack的名字叫sale，就是入口文件名
      filename: 'sale.html' // 生成html的文件名
      // inject: true // 多个html
    })
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json"], // 表示引入这些文件可以不用写后缀
  },
  module: { // 遍历所有文件，根据配置的规则处理js、css文件
    rules: [
      {
        test: /\.jsx?$/, // 以js为结尾的文件
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
       // loader: 'sass-loader' // 用sass-loader处理，废弃，改用插件处理
        use: ExtractTextPlugin.extract({ // 引入插件处理
          fallback: "style-loader",
          use: ["css-loader", 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        // loader: 'css-loader', // 用css-loader,废弃，改用插件处理
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.less$/,
        // loader: 'less-loader' 废弃，改用插件处理
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", 'less-loader']
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg|swf)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name]_[sha512:hash:base64:7].[ext]'
        }
      }
    ]
  }
}
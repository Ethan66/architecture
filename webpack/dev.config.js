const path = require('path')
const baseWebpackConfig = require('./base.config.js');
const devWebpackPartialConfig = {
  // watch: true, // 对文件的编译实时的生效
  devServer: { // 用来本地起端口号，监听文件的变化
    contentBase: path.join(process.cwd(), "sample"),
    // 编译非webpack编译范围的一个目录输出的目录
    compress: true,
    port: 9000
  },
}
module.exports = Object.assign({},
    baseWebpackConfig,
    devWebpackPartialConfig
    )
# git init

# npm init
会生成package.json，是一个npm包管理信息

#package.json
修改script指令
"scripts": {
    "dev": " echo \"hello dev\"",
    "prod": " echo \"hello prod\""
  },

# 安装babel
创建.babelrc（babel run config）
https://babeljs.io/setup#installation
看官网如何安装npm包

babel官网介绍，babel-loader的版本需要比其他babel依赖包高一个级别。
目前babel-loader 8.x,需要安装
npm i -D babel-loader @babel/preset-env @babel/core
因为@babel/preset-env的支持范围更广，包含es2015 es2016 es2017的所有语法编译。并且不需要安装stage
.babelrc配置
{
  "presets": [
    [
      "@babel/env", {
        "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
        }
      }
    ]
  ]
}

babel-loader 7.x,需要安装
npm i -D babel-loader@7 babel-preset-env babel-preset-stage-0 babel-preset-es2015 babel-preset-react babel-core
.babelrc配置
{
  "presets": [ // 预设
     "stage-0", // 一大堆stage-0插件，是插件的集合
     "es2015", // 一大堆es2015插件，是插件的集合
     "react" // 一大堆react插件，是插件的集合
  ],
  "plugins": [] //一个一个插件
}
babel: 将项目中的代码转换成ast，ast是描述代码的树状结构，将let转换成var等等。

# 测试babel
npm i babel -g
创建dist文件夹
package.json添加指令
"babel": "babel src/app/sale.js -d dist"
将sale.js的文件用babel转换到dist文件夹下


# 配置构建工具
npm包地址教程：https://github.com/webpack-contrib
创建webpack文件夹：因为要配置生产环境，发开环境，所以要用文件夹，不是一个文件。
npm i webpack --save-dev
创建文件
base.config.js、dev.config.js、prod.config.js
base.config.js配置入口文件，导出文件和模块配置规则。
安装规则所需要的依赖。
npm i babel-loader css-loader sass-loader less-loader file-loader --save-dev

# 一般将入口文件作为单独的文件引入
详细操作请看base.config.js的方法二

# 测试webpack配置是否能正确打包
package.json添加指令
"webpack": "webpack --config webpack/base.config.js"
npm run webpack，可能存在问题，百度

# 让webpack实时监测文件的变化(转移至dev.config.js)
base.config.js增加配置：
watch: true

# 将css/less/sass单独打包成css文件
很多时候我们会将css引入到js中，如import ./sale.css;但是我们打包都是成js，我们希望的是单独打包成css
安装extract-text-plugin插件(一般用来配置css)：npm i -D extract-text-webpack-plugin
base.config.js配置教程https://github.com/webpack-contrib/extract-text-webpack-plugin，参照Usage

# 测试能否打包图片
在less.css上引入一个图片，看能否打包

# 使用html文件查看webpack配置是否有效(配置转移至dev.config.js)
安装webpack动态配置服务端
npm i -D webpack-dev-server
添加package.json指令
"server": "webpack-dev-server --config webpack/base.config.js",

# 打包html文件
安装html-webpack-plugin插件
npm i --save-dev html-webpack-plugin
base.config.js配置教程https://github.com/jantimon/html-webpack-plugin，参考Usage

# 单元测试
教程https://github.com/facebook/jest
安装
npm i jest
添加指令：
"test": "jest"
创建文件
src/service/calculaate.js

# 生产环境

# 文件压缩
教程https://github.com/webpack-contrib/uglifyjs-webpack-plugin
安装
npm i -D uglifyjs-webpack-plugin
配置prod.config.js文件
添加指令：
"prod": "webpack --config webpack/prod.config.js --optimize-minimize"
执行指令，成功：js被压缩

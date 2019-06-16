const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseWebpackPlugin = require('./base.config.js');
// 导入基础的插件
const plugins = baseWebpackPlugin.plugins;
const newPlugins = plugins.concat([new UglifyJsPlugin()]);
module.exports = Object.assign({},
    baseWebpackPlugin,
    {
        plugins: newPlugins
    })
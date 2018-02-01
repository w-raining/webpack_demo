const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin  = require('extract-text-webpack-plugin');
module.exports = {
    //入口文件的配置项  可以是单一入口，也可以是多入口
    entry: {
        entry: './src/entry.js'  //单入口文件
        //entry2: './src/entry2.js'   //多入口文件
    },
    //出口文件的配置项 在webpack2.X版本后，支持多出口配置
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'  //单出口文件
        // filename: '[name].js'
    },
    //配置模块，例如解读CSS，图片如何转换、压缩
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 500000
                    }
                }]
            }

        ]
    },
    //配置插件，用于生产模板和各项功能
    plugins: [
        new uglify(),
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true   //是对HTML文件进行压缩，removeAttributeQuotes去掉属性的双引号
            },
            hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS
            template: './src/index.html'   //是要打包的html模板路径和文件名称
        })
    ],
    //配置webpack开发服务功能
    devServer: {
        //设置基本目录结构
        contentBase: path.resolve(__dirname, 'dist'),
        //服务器的IP地址，可以使用IP地址也可以使用localhost  建议使用本机IP
        host: 'localhost',
        //服务器压缩是否开启
        compress: true,
        port: 1717
    }
};
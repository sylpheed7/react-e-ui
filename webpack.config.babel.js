import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import notifier from 'notify-webpack-plugin';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import {warmup} from 'thread-loader';
import os from 'os';
import urlConfig from './config.json';

import errorExit from './errorExit';

// 配置基础路径
const basePath = path.resolve(__dirname, 'src');
const outPath = path.join(__dirname, 'dist');
const PORT = 8080;


// 根据配置文件生成对应的base_url文件
const urlData = () => `const baseUrl = '${urlConfig[process.env.NODE_ENV]}'; export default baseUrl;`;

// 获取本地IP地址
const getIP = () => {
    const net = os.networkInterfaces();
    let IP = '';
    const getIPS = (devName, nets) => {
        const iface = nets[devName];
        iface.forEach((v, i) => {
            const alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                IP = alias.address;
            }
        });
    };

    Object.keys(net).map((devName) => {
        if (Object.hasOwnProperty.call(net, devName)) {
            getIPS(devName, net);
        }
        return false;
    });

    return IP;
};

fs.writeFileSync(`${basePath}/js/common/base_url.js`, urlData());

const workerPoolJS = {
    workers: os.cpus().length,
    poolTimeout: process.env.NODE_ENV === 'local' ? Infinity : 2000
};

const workerPoolSCSS = {
    workers: os.cpus().length,
    workerParallelJobs: 2,
    poolTimeout: process.env.NODE_ENV === 'local' ? Infinity : 2000,
};

//js 预热
warmup(workerPoolJS, [
    'babel-loader',
    'eslint-loader'
]);

//scss|css预热
warmup(workerPoolSCSS, [
    'css-loader',
    'postcss-loader',
    'sass-loader'
]);

// defaults 要可修改配置参数
const defaults = {
    devServer: {
        contentBase: outPath,
        overlay: true,
        historyApiFallback: true,
        host: getIP(),
        open: true,
        port: PORT
    },
    entry: {
        common: ['scss/reset.scss', 'utils'],
        index: 'js/index.jsx'
    },
    resolve: {
        modules: [basePath, 'node_modules'],
        alias: {
            utils: `${basePath}/js/common/utils.js`,
            '@': '../../components'
        },
        extensions: ['.js', '.jsx', '.tsx', '.ts', '.scss', '.ico', '.json']
    },
    ProvidePlugin: new webpack.ProvidePlugin({
        React: 'react',
        classNames: 'classnames/dedupe'
    }),
    HtmlPlugin: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // 生成的html存放路径，相对于path
            cache: false,
            template: './index.html', // html模板路径
            inject: 'true', // js插入的位置，true/'head'/'body'/false
            favicon: './image/logo.ico',
            // hash: true, //为静态资源生成hash值
            chunks: ['runtime', 'common', 'index'] // 需要引入的chunk，不配置就会引入所有页面的资源
        })
    ],
    CopyWebpackPlugin: new CopyWebpackPlugin([
        // 目录拷贝
        {
            from: 'resouce',
            to: 'resouce'
        },
        {
            from: 'image',
            to: 'image'
        }
    ])
};


const  ExtractSCSS = new MiniCssExtractPlugin({
        filename: 'css/[name].[md5:contenthash:hex:10].css',
        chunkFilename: "css/[id].css"
    }),
    config = {
        stats: 'errors-only',
        mode: process.env.NODE_ENV === 'local' ? 'development' : 'production',
        context: basePath,
        devtool: process.env.NODE_ENV === 'local' ? 'cheap-module-eval-source-map' : 'none',
        target: 'web',
        // cache: true,
        entry: defaults.entry,
        output: {
            path: outPath, // 输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
            filename: 'js/[name].[chunkhash:10].js', // 每个页面对应的主js的生成配置
            publicPath: process.env.NODE_ENV === 'local' ? '/' : '/feui/',
            chunkFilename: 'js/[name].[chunkhash:10].js'
        },
        watch: process.env.NODE_ENV === 'local',
        watchOptions: {
            aggregateTimeout: 500,
            poll: 1000,
            ignored: /node_modules/
        },
        optimization: {
            removeAvailableModules: false,
            removeEmptyChunks: false,
            usedExports: true,
            runtimeChunk: {
                name: 'runtime'
            },
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'async',
                        name: 'common',
                        minChunks: Infinity,
                        maxAsyncRequests: 5,
                        maxInitialRequests: 3,
                        minSize: 0
                    }
                }
            }
        },
        devServer: process.env.NODE_ENV === 'local' ? defaults.devServer : {},
        plugins: [
            new webpack.HashedModuleIdsPlugin(),
            ExtractSCSS, // 单独使用link标签加载css并设置路径，相对于output配置中的publickPath
            new CleanWebpackPlugin(),
            new notifier('SGEXP'),
            new errorExit()
        ],
        resolve: defaults.resolve,
        module: {
            rules: [{
                test: /\.(png|jpg|gif|svg|webp|ttc|ttf|eot|woff)$/,
                include: basePath,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 1000,
                        // useRelativePath: true,
                        // outputPath: './img',
                        publicPath: process.env.NODE_ENV === 'local' ? '/' : '/feui/',
                        name: 'img/[name].[hash:10].[ext]'
                    }
                }]
            }, {
                test: /\.html$/,
                include: basePath,
                use: ['html-loader']
            }, {
                test: /\.(js)x?$/,
                include: basePath,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: workerPoolJS
                    },
                    'babel-loader?cacheDirectory', 'eslint-loader'
                ]
            }, {
                // 编译SCSS生成link链接
                test: /\.scss$/,
                // include: basePath,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'thread-loader',
                        options: workerPoolSCSS
                    },
                    'css-loader', 'postcss-loader', 'sass-loader'
                ]
            }]
        }
    };

config.plugins.push(...defaults.HtmlPlugin, defaults.ProvidePlugin, defaults.CopyWebpackPlugin);

const loaderOptionsPlugin = new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: {
        context: __dirname
    }
});

// if (process.env.NODE_ENV !== 'local') {
//     config.plugins.push(loaderOptionsPlugin, new ParallelUglifyPlugin({
//         test: /\.js($|\?)/i,
//         exclude: /node_modules/,
//         uglifyJS: {
//             output: {
//                 beautify: false // 不需要格式化
//             },
//             compress: {
//                 // warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
//                 drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
//                 collapse_vars: true, // 内嵌定义了但是只用到一次的变量
//                 reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
//             }
//         }
//     }));
// }

export default config;

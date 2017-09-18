const path = require('path');
const webpack = require('webpack');

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const APP_PATH = path.resolve(__dirname, 'resource/assets/js/');
const VIEWS_PATH = path.resolve(__dirname, 'views');

module.exports = {
    entry: {
        'main': __dirname + "/resource/assets/js/main.es"
    },
    output: {
        path: path.join(__dirname, '/public/assets/'),
        publicPath: "./",
        filename: "js/[name].js"
    },
    module: {
        rules: [{
            test: /\.es$/,
            use: [{
                loader: "babel-loader",
                options: {
                    "presets": ["es2015", "stage-0"]
                }
            }],
            exclude: "/node_modules"
        },{
            test: /\.scss$/,
            use: ExtractTextWebpackPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader"
                },{
                    loader: "sass-loader"
                }]
            }),
            exclude: "/node_modules"
        }]
    },
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: "css/[name].css",
            disable: false,
            allChunks: true,
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: VIEWS_PATH + "/index.html",
            inject: true
        })
    ]
}
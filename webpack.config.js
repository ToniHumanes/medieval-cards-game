const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    //mode: 'production',  
    entry: {
        base: './src/app/index.ts'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
            favicon: './assets/favicon.ico',
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: 'style.min.css'
        })
    ],
    module: {
        rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: [/\.component.scss$/, /\home.scss$/, /\about.scss$/],
                exclude: /node_modules/,
                use: [
                    "sass-to-string",
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                outputStyle: "compressed",
                            },
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                exclude: [/\.component.scss$/, /\home.scss$/, /\about.scss$/ ,/node_modules/],
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: '[path][name][ext]'
                },
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};
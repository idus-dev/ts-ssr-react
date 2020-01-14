/* eslint-disable import/no-extraneous-dependencies */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackChangeAssetsExtensionPlugin = require('html-webpack-change-assets-extension-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

const client = {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dev'),
        port: 3000,
        host: `localhost`
    },
    entry: {
        app: ['./src/client/index.tsx']
    },
    output: {
        path: path.join(__dirname, 'dev'),
        filename: 'client.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.m?(js|ts|tsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|ico|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './assets/images/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx','.ts','.tsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: 'true'
        }),
        new Dotenv({
            path: path.resolve(process.cwd(), '.env.local')
        }),
        new HtmlWebpackPlugin({
            template: 'src/client/app-shell.html',
            filename: 'app-shell.html',
            favicon: './public/favicon.ico'
        })
    ]
};

const server = {
    mode: 'development',
    entry: './src/server/index.ts',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'dev'),
        filename: 'server.js',
        publicPath: '/',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.m?(js|ts|tsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: 'file-loader?name=./assets/images/[name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx','.ts','.tsx']
    },
    plugins: [new webpack.DefinePlugin({ __isBrowser__: 'false' })]
};

module.exports = [client, server];
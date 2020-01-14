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
    mode: 'production',
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[hash].bundle.js',
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        runtimeChunk: {
            name: entrypoint => `runtime~${entrypoint.name}`
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                chunkFilter: chunk => {
                    // Exclude uglification for the `vendor` chunk
                    if (chunk.name === 'vendor') {
                        return false;
                    }

                    return true;
                },
                terserOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|ico|svg|jpg|gif)$/,
                use: 'file-loader?name=./assets/images/[name].[ext]'
            }
        ]
    },
    plugins: [
        new Dotenv({
            path: path.resolve(process.cwd(), '.env.production')
        }),
        new webpack.DefinePlugin({ __isBrowser__: 'true' }),
        new HtmlWebpackPlugin({
            template: 'src/client/app-shell.html',
            filename: 'app-shell.html',
            favicon: 'public/favicon.ico',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
            jsExtension: '.gz'
        }),
        new CompressionPlugin({
            deleteOriginalAssets: true,
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$/,
            minRatio: 0.8
        }),
        new HtmlWebpackChangeAssetsExtensionPlugin(),
        new WebpackPwaManifest({
            inject: true,
            ios: true,
            name: 'SSR-React',
            short_name: 'SSR',
            description: 'My awesome Progressive Web App!',
            background_color: '#dd5850',
            theme_color: '#dd5850',
            display: 'standalone',
            icons: [
                {
                    src: path.resolve('public/app-icon.png'),
                    sizes: [96, 128, 192, 256, 384, 512],
                    destination: path.join('icons', 'ios'),
                    ios: true
                }
            ]
        }),
        new BundleAnalyzerPlugin({ analyzerMode: 'none' })
    ]
};

const server = {
    mode: 'production',
    entry: './src/server/index.js',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'server.js',
        publicPath: '/',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
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
    plugins: [new webpack.DefinePlugin({ __isBrowser__: 'false' })]
};

module.exports = [client, server];

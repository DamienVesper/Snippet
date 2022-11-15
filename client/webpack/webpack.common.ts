import * as Webpack from 'webpack';
import WDS from 'webpack-dev-server';

import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import CSSMinimizerPlugin from 'css-minimizer-webpack-plugin';

import * as path from 'path';
import { config as dotenv } from 'dotenv';
dotenv();

interface Configuration extends Webpack.Configuration {
    devServer?: WDS.Configuration
}

const config: Configuration = {
    entry: {
        app: path.resolve(__dirname, `../src/index.tsx`)
    },

    resolve: {
        extensions: [`.js`, `.jsx`, `.ts`, `.tsx`]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: `ts-loader`,
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.m?js$/,
                use: {
                    loader: `babel-loader`,
                    options: {
                        presets: [
                            [`@babel/preset-env`, { targets: `defaults` }]
                        ],
                        plugins: [`@babel/plugin-proposal-class-properties`]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    `css-loader`,
                    `postcss-loader`
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCSSExtractPlugin.loader, `css-loader`, `postcss-loader`, `sass-loader`]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: `asset/resource`,
                generator: {
                    filename: `assets/img/static/[name].[contenthash][ext]`
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: `asset/resource`,
                generator: {
                    filename: `assets/fonts/static/[name].[contenthash][ext]`
                }
            }
        ]
    },

    optimization: {
        runtimeChunk: {
            name: `manifest`
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: `vendor`,
                    chunks: `all`
                }
            }
        },
        minimizer: [
            `...`,
            new CSSMinimizerPlugin({
                minimizerOptions: {
                    preset: [`default`, { discardComments: { removeAll: true } }]
                }
            })
        ]
    },

    plugins: [
        new Webpack.ProgressPlugin(),
        new Webpack.DefinePlugin({ CLIENT_ID: `\`${process.env.CLIENT_ID ?? ``}\`` }),
        new WebpackManifestPlugin({}),
        new HTMLWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, `../public/index.html`),
            hash: true,

            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new MiniCSSExtractPlugin({ filename: `assets/css/[name].[contenthash].css` })
    ]
};

export default config;

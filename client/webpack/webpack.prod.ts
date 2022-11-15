import merge from 'webpack-merge';
import common from './webpack.common';

import { DefinePlugin } from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import * as path from 'path';

const config = merge(common, {
    mode: `production`,

    output: {
        path: path.resolve(__dirname, `../build`),
        filename: `assets/js/[name].[chunkhash].js`,
        clean: true
    },

    plugins: [
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, `../public`),
                to: path.resolve(__dirname, `../build`),
                globOptions: {
                    ignore: [`**/index.html`]
                }
            }]
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: [`**/*.LICENSE.txt`],
            protectWebpackAssets: false
        }),
        new DefinePlugin({ API_URL: `\`https://${process.env.API_URL ?? ``}/api\`` })
    ]
});

export default config;

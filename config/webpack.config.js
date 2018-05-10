'use strict';
const webpack = require('webpack');
const path = require('path');

const rootdir = path.join(__dirname, '../');

module.exports = {
    entry: {
        "APIClient.browser": ['babel-polyfill', path.join(rootdir, 'dist/APIClient.js')],
    },
    output: {
        path: path.join(rootdir, 'dist/'),
        publicPath: '',
        filename: '[name].js',
        library: "APIClient",
        libraryTarget: "umd"
    },
    target: "web",
    module: {
        rules: [
            {test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/}
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    ]
};

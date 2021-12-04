const webpack = require("webpack");
const NodemonPlugin = require("nodemon-webpack-plugin");
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
    mode: 'development',
    target: 'node',
    entry: './src/index.js',
    output: {
        path: __dirname + (prod ? '/bundle' : '/dist'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /signer\.js/,
                use: [
                    {
                        loader: 'imports-loader',
                        options: {
                            type: 'commonjs',
                            additionalCode: 'var define = wx = false;'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
		new webpack.DefinePlugin({
			'process.env.IS_PROD': JSON.stringify(prod)
        }),
        new NodemonPlugin({
            script: './src/server/index.js',
            watch: path.resolve('./src')
        })
    ]
}

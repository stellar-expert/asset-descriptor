const path = require('path')
const webpack = require('webpack')

module.exports = function () {
    return {
        mode: 'production',
        devtool: 'source-map',
        entry: {
            'asset-descriptor': [path.join(__dirname, '/src/commonjs.js')]
        },
        output: {
            path: path.join(__dirname, './lib'),
            filename: '[name].js',
            library: {
                name: 'assetDescriptor',
                type: 'umd',
                export: 'default'
            },
            libraryTarget: 'umd',
            globalObject: 'this'
        },
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                }
            ]
        },
        externals: {
            '@stellar/stellar-base': '@stellar/stellar-base'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ],
        optimization: {
            minimize: false
        }
    }
}

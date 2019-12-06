const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'public', 'js'),
        filename: 'main.js'
    },
    mode:'development',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 4200
      },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    plugins:[
        new CopyPlugin([
            { from : 'src/img/', to: '../img'},
            { from : 'src/css/', to: '../css'},
            { from : 'src/index.html', to: '../index.html'},
            { from : 'src/js/constants/config.json', to: '../constants/config.json'},
        ])
    ],
    watch:true,
    stats: {
        colors: true
    },
    devtool: 'source-map'
  };
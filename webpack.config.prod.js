import webpack from "webpack"; // eslint-disable-line no-unused-vars
import path from "path";


/** eslint-disable no-unused-vars */
export default {
    debug: true,
    devtool: 'source-map',
    noInfo: false,
    entry: [
        path.resolve(__dirname, 'src/index')
    ],
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src')
    },
    plugins: [
        //eliminate dupls
        new webpack.optimize.DedupePlugin(),
        //Minify JS
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
            {test: /\.css$/, loaders: ['style', 'css']},
        ]
    }
};

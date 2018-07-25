const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
    entry: {
        bundle: [
            path.resolve(__dirname, 'src/app.ts')
        ]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "/build")
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                options: {
                    getCustomTransformers: () => ({
                        before: [tsImportPluginFactory({
                            libraryName: 'antd',
                            libraryDirectory: 'es',
                            style: 'css',
                        })]
                    })
                },
                exclude: /node_modules/
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            { test: /\.css$/, loader: 'style-loader!css-loader' },

            { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },

            { test: /\.(jpe|jpg|gif|png|svg|woff|woff2|eot|ttf|ico|otf)(\?.*$|$)/, loader: "file-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },

    devServer: {
        inline: true,
        hot: true,
        contentBase: path.resolve(__dirname, 'build'),
        host: '0.0.0.0',
        port: 8080,
        compress: true,
        open: "http://localhost:8080",
        historyApiFallback: true
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            favicon: '',
            filename: 'index.html',
            template: './index.html',
            inject: 'body',
            chunks: ['bundle']
        })
    ]
};
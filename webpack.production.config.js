const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, "src/app.ts")
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: "[name].js"
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

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    priority: -20,
                    chunks: "all"
                }
            }
        }
    },

    plugins: [
        setVersion,
        new HtmlWebpackPlugin({
            favicon: '',
            filename: 'index.html',
            template: './index.html',
            inject: 'body',
            hash: true,
            chunks: ['vendors', 'app'],
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        })
    ]
};


function setVersion() {
    const sh = require('shelljs');
    const fs = require('fs');
    this.plugin('compile', function(compilation) {
        const commit = sh.exec('git rev-parse HEAD').stdout.match(/[0-9a-f]*/);

        const version = fs.readFileSync(path.join(__dirname, 'src/common/Version.js'), 'utf8');
        const versionOutput = version.replace(/const\s+commit\s+=\s+.*/, 'const commit = "' + commit + '";');
        console.log(versionOutput);

        fs.writeFileSync(path.join(__dirname, 'src/common/Version.js'), versionOutput);
    });

    this.plugin('done', function(statsData) {
        const stats = statsData.toJson();

        sh.exec('git checkout -- src');

        if (stats.errors.length) {
            return;
        }

        const commit = sh.exec('git rev-parse HEAD').stdout.match(/[0-9a-f]*/);
        fs.writeFileSync(path.join(__dirname, 'dist/commit'), commit);
    });
}

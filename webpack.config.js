/* becodeorg/mwenbwa
 *
 * /webpack.config.js - Webpack configuration
 *
 * coded by leny@BeCode
 * started at 18/05/2020
 */

/* eslint-disable */

const webpack = require("webpack");
const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    const plugins = [
        new webpack.EnvironmentPlugin({
            NODE_ENV: env === "dev" ? "development" : "production",
            VERSION: require("./package.json").version,
            BUILD_TIME: Date.now(),
        }),
        new HtmlWebpackPlugin({
            template: resolve(__dirname, "./src/index.html"),
            path: "../",
        }),
        new MiniCssExtractPlugin({
            filename: "css/mystyles.css",
        }),
    ];

    let optimization = {};

    if (env !== "dev") {
        optimization = {
            runtimeChunk: "single",
            splitChunks: {
                chunks: "all",
                maxInitialRequests: Infinity,
                minSize: 0,
                maxSize: 20000,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            const packageName = module.context.match(
                                /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                            )[1];

                            return `npm.${packageName.replace("@", "")}`;
                        },
                    },
                },
            },
        };
    }

    return {
        mode: env === "dev" ? "development" : "production",
        devtool:
            env === "dev"
                ? "cheap-module-eval-source-map"
                : "hidden-source-map",
        context: resolve(__dirname, "./src/client"),
        entry: ["./app.js"],
        module: {
            rules: [
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[path][name].[ext]",
                            },
                        },
                    ],
                },
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                cacheDirectory: env === "development",
                                presets: [
                                    "@babel/preset-env",
                                    "@babel/preset-react",
                                ],
                                plugins: [
                                    [
                                        "@babel/plugin-proposal-decorators",
                                        {
                                            legacy: true,
                                        },
                                    ],
                                    "@babel/plugin-proposal-object-rest-spread",
                                    [
                                        "@babel/plugin-proposal-class-properties",
                                        {
                                            loose: true,
                                        },
                                    ],
                                ],
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/i,
                    //use: ["style-loader", "css-loader"],
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                // Run `postcss-loader` on each CSS `@import`, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
                                // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
                                importLoaders: 1,
                                // Automatically enable css modules for files satisfying `/\.module\.\w+$/i` RegExp.
                                modules: {auto: true},
                            },
                        },
                    ],
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                // options...
                            },
                        },
                    ],
                },
            ],
        },
        plugins,
        optimization,
        performance: {hints: false},
        output: {
            path: resolve(__dirname, "./bin/client"),
            filename: env === "dev" ? "js/bundle.js" : "js/[chunkhash].js",
        },
        watch: env === "dev",
    };
};

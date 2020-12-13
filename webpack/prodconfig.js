const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        game: "./src/Game.ts",
    },
    mode: "production",
    devServer: {
        contentBase: "./../dist",
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        pathinfo: false,
        filename: "[name].min.js",
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
            },
        ],
    },
    performance: {
        hints: "warning",
        maxEntrypointSize: 10000000,
        maxAssetSize: 2000000,
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    stats: "errors-warnings",
    plugins: [
        new webpack.DefinePlugin({
            CANVAS_RENDERER: JSON.stringify(true),
            WEBGL_RENDERER: JSON.stringify(true),
        }),
        new CopyWebpackPlugin({ 
            patterns: [
            {
                from: "./assets",
                to: "./assets",
                force: true,
            },
            {
                from: "./web",
                to: "./web",
                force: true,
            },
        ]}),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "index.html",
        }),
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, "dist"),
        }),
    ],
};

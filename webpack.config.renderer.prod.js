/**
 * Build config for electron renderer process
 */

import path from "path"
import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"
import merge from "webpack-merge"
import HtmlWebpackPlugin from "html-webpack-plugin"
import BabiliPlugin from "babili-webpack-plugin"
import baseConfig from "./webpack.config.base"
import LessVariables from "./app/global.variables.js"

export default merge.smart(baseConfig, {
    devtool: "source-map",

    target: "electron-renderer",

    entry: ["babel-polyfill", "./app/index"],

    output: {
        path: path.join(__dirname, "app/dist"),
        publicPath: "../dist/"
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true,
                            modifyVars: LessVariables
                        }
                    }
                ]
            },
            // WOFF Font
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff"
                    }
                }
            },
            // WOFF2 Font
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff"
                    }
                }
            },
            // TTF Font
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        mimetype: "application/octet-stream"
                    }
                }
            },
            // EOT Font
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: "file-loader"
            },
            // Common Image Formats
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
                use: "url-loader"
            }
        ]
    },

    plugins: [
        /**
     * Create global constants which can be configured at compile time.
     *
     * Useful for allowing different behaviour between development builds and
     * release builds
     *
     * NODE_ENV should be production so that modules do not perform certain
     * development checks
     */
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(
                process.env.NODE_ENV || "production"
            )
        }),

        /**
     * Babli is an ES6+ aware minifier based on the Babel toolchain (beta)
     */
        new BabiliPlugin(),

        new ExtractTextPlugin("style.css"),

        /**
     * Dynamically generate index.html page
     */
        new HtmlWebpackPlugin({
            filename: "../app.html",
            template: "app/app.html",
            inject: false
        })
    ]
})

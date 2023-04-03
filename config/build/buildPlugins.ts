import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { BuildOptions } from "./types/config";

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

export function buildPlugins({
    paths,
    isDev,
    isAnalyze,
    apiUrl,
    project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    const config = [
        new webpack.ProgressPlugin(),
        new HTMLWebpackPlugin({
            template: paths.html,
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
        }),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: isAnalyze ? "server" : "disabled",
            openAnalyzer: false,
        }),
    ];

    if (isDev) {
        config.push(new webpack.HotModuleReplacementPlugin());
        config.push(new ReactRefreshWebpackPlugin({ overlay: false }));
    }

    return config.filter(Boolean);
}

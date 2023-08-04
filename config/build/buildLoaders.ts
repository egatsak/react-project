import webpack from "webpack";
import { buildCssLoader } from "./loaders/buildCssLoaders";
import { buildBabelLoader } from "./loaders/buildBabelLoader";
import { BuildOptions } from "./types/config";

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;
    const svgLoader = {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
    };

    const cssLoader = buildCssLoader(isDev);

    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    // if we use ts, we don't need babel-loader
    /*  const typescriptLoader = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
            getCustomTransformers: () => ({
                before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
            }),
            transpileOnly: isDev,
        },
    }; */

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: "file-loader",
            },
        ],
    };
    return [
        fileLoader,
        svgLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        // typescriptLoader,
        cssLoader,
    ];
}

import webpack from "webpack";
import { buildCssLoader } from "./loaders/buildCssLoaders";

export function buildLoaders(isDev: boolean): webpack.RuleSetRule[] {
    const svgLoader = {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
    };

    const cssLoader = buildCssLoader(isDev);

    const babelLoader = {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"],
                plugins: [
                    [
                        "i18next-extract",
                        {
                            locales: ["en", "ru"],
                            keyAsDefaultValue: false,
                            saveMissing: true,
                            outputPath: "public/locales/{{locale}}/{{ns}}.json",
                        },
                    ],
                ],
            },
        },
    };

    // if we use ts, we don't need babel-loader
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: "file-loader",
            },
        ],
    };
    return [fileLoader, svgLoader, babelLoader, typescriptLoader, cssLoader];
}

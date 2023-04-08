import { BuildOptions } from "../types/config";

export function buildBabelLoader(options: BuildOptions) {
    const { isDev } = options;
    return {
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
                            keyAsDefaultValue: true,
                            saveMissing: true,
                            outputPath: "public/locales/{{locale}}/{{ns}}.json",
                        },
                        isDev && require.resolve("react-refresh/babel"),
                    ].filter(Boolean),
                ],
            },
        },
    };
}

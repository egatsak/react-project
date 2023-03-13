import path from "path";
import webpack, { DefinePlugin, RuleSetRule } from "webpack";
import { buildCssLoader } from "../build/loaders/buildCssLoaders";

import { BuildPaths } from "../build/types/config";

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: "",
        html: "",
        entry: "",
        src: path.resolve(__dirname, "..", "..", "src"),
    };

    config.resolve?.modules?.unshift(paths.src);
    config.resolve?.extensions?.push(".ts", ".tsx");

    if (config && config.module && config.module.rules) {
        // eslint-disable-next-line no-param-reassign
        config.module.rules = (
            config.module.rules as webpack.RuleSetRule[]
        ).map((rule: RuleSetRule) => {
            if (/svg/.test(rule.test as string)) {
                return { ...rule, exclude: /\.svg$/i };
            }

            return rule;
        });
    }

    config.module?.rules?.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
    });
    config.module?.rules?.push(buildCssLoader(true));

    config.plugins?.push(
        new DefinePlugin({
            __IS_DEV__: true,
        })
    );

    return config;
};

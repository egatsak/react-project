module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        "plugin:react/recommended",
        "airbnb",
        "plugin:i18next/recommended",
        "plugin:storybook/recommended",
        /*         "plugin:react-hooks/recommended", */
        // "plugin:import/recommended", TODO!!!!!!
        // "plugin:prettier/recommended",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: [
        "react",
        "@typescript-eslint",
        "i18next",
        "react-hooks",
        "egatsak-fsd-plugin",
        "unused-imports",
        // eslint
    ],
    rules: {
        // "react/jsx-indent": ["error", 4],
        // "react/jsx-indent-props": [2, 4],
        /*         "no-tabs": ["error", { allowIndentationTabs: true }], */
        /* indent: [2, 4, { SwitchCase: 0 }], */
        "react/jsx-filename-extension": [
            2,
            {
                extensions: [".js", ".jsx", ".tsx"],
            },
        ],
        "import/no-unresolved": "off",
        "import/prefer-default-export": "off",
        "no-unused-vars": "off",
        "react/require-default-props": "off",
        "react/react-in-jsx-scope": "off",
        "react/jsx-props-no-spreading": "warn",
        "react/function-component-definition": "off",
        "no-shadow": "off",
        "import/extensions": "off",
        "import/no-extraneous-dependencies": [
            "warn",
            { devDependencies: true },
        ],
        "no-underscore-dangle": "off",
        "i18next/no-literal-string": [
            "error",
            {
                markupOnly: true,
                ignoreAttribute: [
                    "data-testid",
                    "to",
                    "inputId",
                    "alt",
                    "target",
                    "direction",
                    "justify",
                    "align",
                    "gap",
                    "role",
                    "as",
                    "refName",
                    "border",
                ],
                /*  onlyAttribute: [""], */
            },
        ],
        "@typescript-eslint/no-unused-vars": [
            "warn", // or "error"
            {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_",
                caughtErrorsIgnorePattern: "^_",
            },
        ],
        "max-len": [
            "error",
            {
                code: 125,
                ignoreComments: true,
            },
        ],
        "linebreak-style": ["warn", "unix"],
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "no-param-reassign": [
            "error",
            {
                props: true,
                ignorePropertyModificationsFor: ["state"],
            },
        ],
        "no-undef": "off",
        "egatsak-fsd-plugin/path-checker": ["error", { alias: "@" }],
        "egatsak-fsd-plugin/layer-imports": [
            "error",
            {
                alias: "@",
                ignoreImportPatterns: ["**/StoreProvider", "**/testing"],
            },
        ],
        "egatsak-fsd-plugin/public-api-imports": [
            "error",
            {
                alias: "@",
                testFilesPatterns: [
                    "**/*.story.*",
                    "**/*.stories.*",
                    "**/*.test.*",
                    "**/StoreDecorator.tsx",
                ],
            },
        ],
        "unused-imports/no-unused-imports": "error",
        "react/jsx-max-props-per-line": ["error", { maximum: 4 }],
        "arrow-body-style": "off",
    },
    overrides: [
        {
            files: ["**/src/**/*.{test,stories}.{ts,tsx}"],
            rules: {
                "i18next/no-literal-string": "off",
                "max-len": "off",
            },
        },
        {
            files: ["src/**/*.{test,stories}.{ts,tsx}", "config/**/*{ts,tsx}"],
            rules: {
                "import/no-extraneous-dependencies": "off",
                "react/jsx-props-no-spreading": "off",
            },
        },
    ],
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
};

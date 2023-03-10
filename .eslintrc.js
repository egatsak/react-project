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
        "plugin:prettier/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint", "i18next", "react-hooks"],
    rules: {
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": [2, 4],
        indent: [2, 4],
        "react/jsx-filename-extension": [
            2,
            {
                extensions: [".js", ".jsx", ".tsx"],
            },
        ],
        "import/no-unresolved": "off",
        "import/prefer-default-export": "off",
        "no-unused-vars": "warn",
        "react/require-default-props": "off",
        "react/react-in-jsx-scope": "off",
        "react/jsx-props-no-spreading": "warn",
        "react/function-component-definition": "off",
        "no-shadow": "off",
        "import/extensions": "off",
        "import/no-extraneous-dependencies": "warn",
        "no-underscore-dangle": "off",
        "i18next/no-literal-string": [
            "error",
            {
                markupOnly: true,
                ignoreAttribute: ["data-testid", "to"],
                /*  onlyAttribute: [""], */
            },
        ],

        "max-len": [
            "error",
            {
                code: 120,
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
            },
        },
    ],
    globals: {
        __IS_DEV__: true,
    },
};

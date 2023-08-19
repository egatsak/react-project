import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        // implement node event listeners here
        // setupNodeEvents(on, config) {
        // },
        baseUrl: "http://localhost:4000",
    },

    component: {
        devServer: {
            framework: "react",
            bundler: "webpack",
        },
    },
});

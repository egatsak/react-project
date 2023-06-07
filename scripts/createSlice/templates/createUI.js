const fs = require("fs/promises");
const resolveRoot = require("../resolveRoot");
const firstCharUpperCase = require("../firstCharUpperCase");
const componentTemplate = require("./componentTemplate");
const storyTemplate = require("./storyTemplate");
const styleTemplate = require("./styleTemplate");

module.exports = async (layer, sliceName) => {
    const resolveUIPath = (...segments) =>
        resolveRoot("src", layer, sliceName, "ui", ...segments);

    const createUIDir = async () => {
        try {
            await fs.mkdir(resolveUIPath());
        } catch (e) {
            console.log("UI folder creation failed");
        }
    };

    const createComponent = async () => {
        try {
            const componentName = firstCharUpperCase(sliceName);
            await fs.mkdir(resolveUIPath(componentName));
            await fs.writeFile(
                resolveUIPath(componentName, `${componentName}.tsx`),
                componentTemplate(componentName)
            );
            await fs.writeFile(
                resolveUIPath(componentName, `${componentName}.stories.tsx`),
                storyTemplate(layer, componentName)
            );
            await fs.writeFile(
                resolveUIPath(componentName, `${componentName}.module.scss`),
                styleTemplate(componentName)
            );
        } catch (e) {
            console.log("Component creation failed");
        }
    };

    await createUIDir();
    await createComponent();
};

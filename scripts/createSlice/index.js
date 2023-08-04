// npm run generate:slice features sliceName

const createTemplate = require("./templates/createTemplate");

const layer = process.argv[2];
const sliceName = process.argv[3];

const layers = ["features", "entities", "pages"];

if (!layer || !layers.includes(layer)) {
    throw new Error(`Please specify the layer ${layers.join(" or ")}`);
}

if (!sliceName) {
    throw new Error("Please specify the slice name");
}

createTemplate(layer, sliceName);

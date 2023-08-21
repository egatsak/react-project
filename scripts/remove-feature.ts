import { Project, SyntaxKind, Node } from "ts-morph";

const featureToRemoveName = process.argv[2]; // isArticleEnabled
const featureState = process.argv[3]; // on/off

if (!featureToRemoveName) {
    throw new Error("Feature name is required");
}

if (!featureState || !["on", "off"].includes(featureState)) {
    throw new Error("Feature state is required (e.g. on/off)");
}

const project = new Project({});

project.addSourceFilesAtPaths("src/**/*.ts");
project.addSourceFilesAtPaths("src/**/*.tsx");

function isToggleFunction(node: Node) {
    let isToggleFeatures = false;

    node.forEachChild((child) => {
        if (
            child.isKind(SyntaxKind.Identifier) &&
            child.getText() === "toggleFeatures"
        ) {
            isToggleFeatures = true;
        }
    });

    return isToggleFeatures;
}

const files = project.getSourceFiles();

files.forEach((file) => {
    file.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            const objectOptions = node.getFirstDescendantByKind(
                SyntaxKind.ObjectLiteralExpression,
            );

            if (!objectOptions) return;

            const featureNameProperty = objectOptions.getProperty("name");
            const onFunctionProperty = objectOptions.getProperty("on");
            const offFunctionProperty = objectOptions.getProperty("off");

            const onFunction = onFunctionProperty?.getFirstChildByKind(
                SyntaxKind.ArrowFunction,
            );
            const offFunction = offFunctionProperty?.getFirstChildByKind(
                SyntaxKind.ArrowFunction,
            );
            const featureName = featureNameProperty
                ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
                ?.getText()
                .slice(1, -1); // remove quotes

            if (featureName !== featureToRemoveName) return;

            if (featureState === "on") {
                node.replaceWithText(onFunction?.getBody().getText() ?? "");
            }

            if (featureState === "off") {
                node.replaceWithText(offFunction?.getBody().getText() ?? "");
            }
        }
    });
});

project.save();

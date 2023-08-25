import { Project, SyntaxKind, Node, JsxAttribute } from "ts-morph";

const featureToRemoveName = process.argv[2]; // isArticleEnabled
const featureState = process.argv[3]; // on/off

const TOGGLE_FUNCTION_NAME = "toggleFeatures";
const TOGGLE_COMPONENT_NAME = "ToggleFeatures";

if (!featureToRemoveName) {
    throw new Error("Feature name is required");
}

if (!featureState || !["on", "off"].includes(featureState)) {
    throw new Error("Feature state is required (e.g. on/off)");
}

const project = new Project({});

project.addSourceFilesAtPaths("src/**/*.ts");
project.addSourceFilesAtPaths("src/**/*.tsx");

const files = project.getSourceFiles();

function isToggleFunction(node: Node) {
    let isToggleFeatures = false;

    node.forEachChild((child) => {
        if (
            child.isKind(SyntaxKind.Identifier) &&
            child.getText() === TOGGLE_FUNCTION_NAME
        ) {
            isToggleFeatures = true;
        }
    });

    return isToggleFeatures;
}

function isToggleComponent(node: Node) {
    const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

    return identifier?.getText() === TOGGLE_COMPONENT_NAME;
}

const replaceToggleFunction = (node: Node) => {
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
};

const getAttributeNodeByName = (
    jsxAttributes: JsxAttribute[],
    name: string,
) => {
    return jsxAttributes.find((node) => {
        return node.getName() === name;
    });
};

const getReplacedComponent = (attribute?: JsxAttribute) => {
    const value = attribute
        ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
        ?.getExpression()
        ?.getText();

    if (value?.startsWith("(")) {
        return value.slice(1, -1);
    }

    return value;
};

const replaceComponent = (node: Node) => {
    const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

    const onAttribute = getAttributeNodeByName(attributes, "on");
    const offAttribute = getAttributeNodeByName(attributes, "off");

    const featureNameAttribute = getAttributeNodeByName(attributes, "feature");
    const featureName = featureNameAttribute
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        ?.slice(1, -1);

    if (featureName !== featureToRemoveName) return;

    const offValue = getReplacedComponent(offAttribute);
    const onValue = getReplacedComponent(onAttribute);

    if (featureState === "on" && onValue) {
        node.replaceWithText(onValue);
    }

    if (featureState === "off" && offValue) {
        node.replaceWithText(offValue);
    }
};

files.forEach((file) => {
    // eslint-disable-next-line consistent-return
    file.forEachDescendant((node) => {
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            return replaceToggleFunction(node);
        }

        if (
            node.isKind(SyntaxKind.JsxSelfClosingElement) &&
            isToggleComponent(node)
        ) {
            return replaceComponent(node);
        }
    });
});

project.save();

import path from "path";
import { Project } from "ts-morph";

const project = new Project({});

project.addSourceFilesAtPaths("src/**/*.ts");
project.addSourceFilesAtPaths("src/**/*.tsx");

const files = project.getSourceFiles();

const sharedUiDirectory = project.getDirectory(
    path.resolve(__dirname, "..", "..", "src", "shared", "ui")
);
const componentsDirs = sharedUiDirectory?.getDirectories();

function isAbsolute(path: string) {
    const layers = [
        "app",
        "shared",
        "entities",
        "features",
        "widgets",
        "pages",
    ];
    return layers.some((layer) => path.startsWith(layer));
}

componentsDirs?.forEach((dir) => {
    const indexFilePath = `${dir.getPath()}/index.ts`;
    const indexFile = dir.getSourceFile(indexFilePath);

    if (!indexFile) {
        const sourceCode = `export * from "./${dir.getBaseName()}";
        `;
        const file = dir.createSourceFile(indexFilePath, sourceCode, {
            overwrite: true,
        });
        file.save();
    }
});

files.forEach((file) => {
    const importDeclarations = file.getImportDeclarations();

    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();

        const valueWithoutAlias = value.replace("@/", "");

        const segments = valueWithoutAlias.split("/");

        const isSharedLayer = segments?.[0] === "shared";

        const isUiSlice = segments?.[1] === "ui";

        if (isAbsolute(value) && isSharedLayer && isUiSlice) {
            const result = valueWithoutAlias.split("/").slice(0, 3).join("/");

            importDeclaration.setModuleSpecifier(`@/${result}`);
        }
    });
});

project.save();

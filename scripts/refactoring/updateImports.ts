import { Project } from "ts-morph";

const project = new Project({});

project.addSourceFilesAtPaths("src/**/*.ts");
project.addSourceFilesAtPaths("src/**/*.tsx");

const files = project.getSourceFiles();

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

files.forEach((file) => {
    const importDeclarations = file.getImportDeclarations();

    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();
        if (isAbsolute(value)) {
            importDeclaration.setModuleSpecifier(`@/${value}`);
        }
    });
});

project.save();

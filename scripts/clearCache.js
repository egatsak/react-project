const fs = require("node:fs/promises");
const path = require("node:path");

try {
    fs.rm(path.resolve(__dirname, "..", "node_modules", ".cache"), {
        recursive: true,
        force: true,
    });
} catch (error) {
    console.log(
        error instanceof Error
            ? error.message
            : "Error deleting non-empty directory"
    );
}

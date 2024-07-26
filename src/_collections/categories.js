const fs = require("fs");
const path = require("path");

module.exports = () => {
    const radarsDir = path.join(process.cwd(), "radars")

    return fs.readdirSync(radarsDir)
        .filter((file) =>
            fs.statSync(path.join(radarsDir, file)).isDirectory()
        );
};

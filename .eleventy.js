const fs = require("fs");
const jsmin = require("./src/_transforms/jsmin")

module.exports = (config) => {
    config.addCollection("radars", require("./src/_collections/radars"))
    config.addCollection("categories", require("./src/_collections/categories"))

    config.addShortcode("visualizeRadar", (radar) => {
        const baseSettings = JSON.parse(fs.readFileSync("src/_data/radar-settings.json", "utf8"));

        var payload = {
            "title": radar.category,
            "date": radar.date,
            ...baseSettings,
            ...radar.data
        };

        return `radar_visualization(${JSON.stringify(payload)})`;
    });

    config.addFilter("filter", (arr, key, value) => {
        return arr?.filter(item => item[key] === value);
    });

    config.addNunjucksAsyncFilter("jsmin", jsmin);

    config.addPassthroughCopy({ "src/_assets/js": "js" })
    config.addPassthroughCopy({ "src/_assets/fonts": "fonts" })
    config.addPassthroughCopy({ "src/_assets/styles": "styles" })
    config.addPassthroughCopy({ "src/_assets/images": "images" })

    return {
        dir: {
            input: "src",
            output: "public",
            layouts: "_layouts",
        },
    };
};

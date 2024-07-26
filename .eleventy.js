const fs = require("fs");
const path = require("path");
const jsmin = require("./src/_transforms/jsmin")
const { parse } = require("csv-parse/sync");

function readCSV(dir) {
    var file = fs.readFileSync(dir);

    return parse(
        file,
        {
            columns: true,
            skip_empty_lines: true,
            delimiter: ","
        }
    );
}

function readCategories(dir) {
    return fs.readdirSync(dir).filter((file) =>
        fs.statSync(path.join(dir, file)).isDirectory()
    );
}

function readRadars(dir, category) {
    const radarDir = path.join(dir, category);
    const files = fs.readdirSync(radarDir);

    var radars = [];
    var settings = {};

    for (const file of files) {
        if (path.basename(file) === "settings.json") {
            settings = JSON.parse(fs.readFileSync(path.join(radarDir, file), 'utf8'));
            break
        }
    }

    for (const file of files) {
        if (path.extname(file) === ".csv") {
            const csv = readCSV(path.join(radarDir, file));

            radars.push(
                {
                    category: category,
                    date: path.basename(file, ".csv"),
                    data: getRadar(csv, settings)
                }
            );
        }
    }

    return radars;
}

function getRadar(csv, settings) {
    const ringsMap = {
        "adopt": 0,
        "trial": 1,
        "assess": 2,
        "hold": 3
    };

    const quadrantsMap = {
        "q1": 0,
        "q2": 1,
        "q3": 2,
        "q4": 3
    };

    const rings = Object.keys(settings.rings).map((e) => settings.rings[e]);
    const quadrants = Object.keys(settings.quadrants.names).map((e) => ({ name: settings.quadrants.names[e] }));

    var entries = [];

    csv.forEach((value) => {
        entries.push(
            {
                label: value["name"],
                ring: ringsMap[value["ring"]],
                quadrant: quadrantsMap[settings.quadrants.aliases[value["quadrant"]]]
            }
        )
    });

    return {
        "rings": rings,
        "quadrants": quadrants,
        "entries": entries
    };
}

module.exports = (config) => {
    const radarsDir = "radars";

    config.addCollection("radars", () => {
        const categories = readCategories(radarsDir);

        var radars = [];

        for (const category of categories) {
            radars.push(...readRadars(radarsDir, category));
        }

        return radars;
    });

    config.addCollection("categories", () => {
        return readCategories(radarsDir);
    });

    config.addShortcode("visualizeRadar", (radar) => {
        const baseSettings = JSON.parse(fs.readFileSync("src/_data/radar-settings.json", "utf8"));

        var payload = {
            ...baseSettings,
            ...radar.data
        };

        return `radar_visualization(${JSON.stringify(payload)})`;
    });

    config.addNunjucksAsyncFilter("jsmin", jsmin);

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

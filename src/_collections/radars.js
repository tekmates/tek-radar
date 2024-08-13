const fs = require("fs");
const path = require("path");
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

function readRadar(csv, settings) {
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

function readRadars() {
    const radarsDir = path.join(process.cwd(), "radars")
    const categories = fs.readdirSync(radarsDir)

    var radars = [];

    for (const category of categories) {
        var categoryPath = path.join(radarsDir, category);

        var settingsPath = path.join(categoryPath, "settings.json");
        var settings = {};

        if (fs.existsSync(settingsPath)) {
            settings = JSON.parse(fs.readFileSync(settingsPath), 'utf8');
        }

        var radarFiles = fs.readdirSync(categoryPath);

        for (const radar of radarFiles) {
            if (path.extname(radar) === ".csv") {
                const csv = readCSV(path.join(categoryPath, radar));

                radars.push(
                    {
                        category: category,
                        date: path.basename(radar, ".csv"),
                        data: readRadar(csv, settings)
                    }
                );
            }
        }
    }

    return radars;
}

module.exports = () => {
    return readRadars()
}
const terser = require("terser");

module.exports = async (value, callback) => {
    try {
        const minified = await terser.minify(value);
        callback(null, minified.code);
    } catch (err) {
        console.log("Terser failed with error: ", + err);
        callback(null, err);
    }
};

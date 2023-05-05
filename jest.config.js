const { defaults } = require("jest-config");

module.exports = {
	moduleFileExtensions: [...defaults.moduleFileExtensions, "js", "mjs"],
	testPathIgnorePatterns: [],
};

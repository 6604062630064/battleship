module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["prettier"],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		"prettier/prettier": ["error"],
	},
	plugin: ["prettier"],
};

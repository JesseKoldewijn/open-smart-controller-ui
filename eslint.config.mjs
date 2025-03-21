import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import reactCompiler from "eslint-plugin-react-compiler";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
	{ languageOptions: { globals: globals.browser } },
	{
		plugins: {
			"react-compiler": reactCompiler,
		},
		rules: {
			"react-compiler/react-compiler": "error",
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];

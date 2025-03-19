import globals from "globals";
import pluginJs from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import PreactConfig from "eslint-config-preact";
import exportScope from "eslint-plugin-export-scope";

// running through defineConfig to flatten recommended config
const preactExtConfig = defineConfig(PreactConfig);

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	exportScope.configs.flatConfigRecommended,
	...preactExtConfig,
];

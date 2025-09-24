import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Backend files
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },

  // Jest test files
  { files: ["**/*.test.js"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: { ...globals.node, ...globals.jest },  sourceType: "script", }, },
]);

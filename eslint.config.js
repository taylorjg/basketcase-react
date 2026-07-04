import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import vitest from "@vitest/eslint-plugin";
import cypress from "eslint-plugin-cypress";

export default defineConfig([
  globalIgnores(["dist"]),
  js.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    files: ["src/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      // "detect" uses context.getFilename(), removed in ESLint 10 — pin version instead.
      react: { version: "19.2" },
    },
    extends: [react.configs.flat.recommended, react.configs.flat["jsx-runtime"]],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": "warn",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["**/*.{test,spec}.{js,jsx}", "src/setupFiles.js"],
    extends: [vitest.configs.recommended, vitest.configs.env],
  },
  {
    files: ["cypress/**/*.js", "**/*.cy.js"],
    extends: [cypress.configs.recommended],
  },
  {
    files: ["vite.config.js", "eslint.config.js", "cypress.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
]);

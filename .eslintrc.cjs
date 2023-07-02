/* eslint-env node */

module.exports = {
  env: { browser: true, es2020: true, "vitest-globals/env": true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:vitest/recommended",
    "plugin:vitest-globals/recommended",
    "plugin:cypress/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "vitest"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
  overrides: [
    {
      files: ["*.cy.js"],
      rules: {
        "vitest/expect-expect": "off",
      },
    },
  ],
};

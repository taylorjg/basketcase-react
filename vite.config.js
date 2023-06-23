/* eslint-env node */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/basketcase-react",
  plugins: [react()],
  resolve: {
    alias: [{ find: "@app", replacement: path.resolve(__dirname, "src") }],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupFiles.js",
  },
});

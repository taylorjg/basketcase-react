import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/basketcase-react/",
  plugins: [react()],
  // MUI 5 icons are CJS default exports; Vite 8 no longer unwraps them automatically.
  legacy: {
    inconsistentCjsInterop: true,
  },
  resolve: {
    alias: [{ find: "@app", replacement: path.resolve(__dirname, "src") }],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupFiles.js",
  },
});

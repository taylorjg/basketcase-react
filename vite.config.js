import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/basketcase-react/",
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@app", replacement: path.resolve(import.meta.dirname, "src") },
    ],
  },
  test: {
    globals: true,
    environment: "jsdom",
    // MSW 3 + jsdom: default document URL is http://localhost/, so axios requests
    // to the API host look cross-origin and fail with "Network Error". Match the API base.
    environmentOptions: {
      jsdom: {
        url: "https://rqnfyvya7e.execute-api.us-east-1.amazonaws.com/",
      },
    },
    setupFiles: "./src/setupFiles.js",
  },
});

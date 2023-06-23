import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5174/basketcase-react",
    setupNodeEvents(/* on, config */) {
      // implement node event listeners here
    },
  },
});

import { defaults } from "jest-config";

export default {
  testEnvironment: "miniflare",
  testMatch: ["**/dist/test/**/*.mjs"],
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mjs"],
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");

// Load the environment variables from .env.test
dotenv.config({ path: ".env.test" });

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
};

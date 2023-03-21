import type { Config } from "jest";

const config: Config = {
  preset: "react-native",
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  setupFiles: ["<rootDir>/__tests__/setup.js"],
  setupFilesAfterEnv: [
    "<rootDir>/__tests__/setup-after-env.ts",
    "@testing-library/jest-native/extend-expect",
  ],
  testMatch: ["<rootDir>/__tests__/**/?(*.)+(spec|test).[jt]s?(x)"],
  globals: {
    __DEV__: true,
  },
};

export default config;

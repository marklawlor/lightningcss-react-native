import matchers from "expect/build/matchers";
import { expect } from "@jest/globals";

import { toReactNative } from "../src";

matchers.customTesters = [];

expect.extend({
  toRNStyle(received, expected) {
    return matchers.toStrictEqual(
      toReactNative(`.className {${received}}`).reactNative["className"],
      expected
    );
  },
});

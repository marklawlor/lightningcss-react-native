import { transform } from "lightningcss";
import { collectRules } from "./react-native";

export function toReactNative(css: string) {
  const reactNative: Record<string, Record<string, unknown>> = {};

  const { code } = transform({
    filename: "style.css",
    code: Buffer.from(css),
    visitor: {
      RuleExit: collectRules(reactNative),
    },
  });

  return { web: code, reactNative };
}

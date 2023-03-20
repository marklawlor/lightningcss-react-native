import { transform } from "lightningcss";
import { collectRules } from "./react-native";

function toReactNative(css: string) {
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

console.log(
  JSON.stringify(
    toReactNative(".foo { transform: translate(10px, 5px);}").reactNative,
    null,
    2
  )
);
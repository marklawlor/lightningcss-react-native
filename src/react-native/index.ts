import { Visitor, CustomAtRules } from "lightningcss";
import { keyframes } from "./keyframes";
import { getRuleRecord } from "./get-declarations";

export function collectRules(rules: Record<string, Record<string, unknown>>) {
  const animations = new Map<string, unknown>();

  const ruleExit: Visitor<CustomAtRules>["RuleExit"] = (rule) => {
    console.log(111, rule);
    switch (rule.type) {
      case "import":
      case "font-face":
      case "font-palette-values":
      case "namespace":
      case "custom-media":
      case "layer-statement":
      case "property":
      case "ignored":
      case "unknown":
      case "custom":
      case "media":
      case "page":
      case "supports":
      case "counter-style":
      case "moz-document":
      case "nesting":
      case "viewport":
      case "layer-block":
      case "container":
        return rule;
      case "keyframes":
        animations.set(rule.value.name.value, keyframes(rule.value.keyframes));
        return rule;
      case "style": {
        const ruleRecord = getRuleRecord([
          ...rule.value.declarations.declarations,
          ...rule.value.declarations.importantDeclarations,
        ]);

        if (Object.keys(ruleRecord).length === 0) {
          return rule;
        }

        for (const selectors of rule.value.selectors) {
          for (const selector of selectors) {
            if (selector.type === "class") {
              rules[selector.name] = ruleRecord;
            }
          }
        }
      }
    }

    return rule;
  };

  return ruleExit;
}

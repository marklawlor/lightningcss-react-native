import { Visitor, CustomAtRules, Declaration } from "lightningcss";
import { textShadow } from "./transforms/text-shadow";
import { parseValue } from "./transforms/value";
import { transform } from "./transforms/transform";

export function collectRules(rules: Record<string, Record<string, unknown>>) {
  const ruleExit: Visitor<CustomAtRules>["RuleExit"] = (rule) => {
    if (rule.type !== "style") return rule;

    for (const selectors of rule.value.selectors) {
      for (const selector of selectors) {
        if (selector.type === "class") {
          for (const declaration of [
            ...rule.value.declarations.declarations,
            ...rule.value.declarations.importantDeclarations,
          ]) {
            const rnDeclarations = getDeclarations(declaration);

            if (!rnDeclarations) {
              return [];
            }

            // Convert to camelCase
            const camelCaseName = selector.name.replace(/-./g, (x) =>
              x[1].toUpperCase()
            );

            rules[camelCaseName] ??= {};

            if (Array.isArray(rnDeclarations)) {
              for (const { property, value } of rnDeclarations) {
                rules[camelCaseName][property] = value;
              }
            } else {
              rules[camelCaseName][rnDeclarations.property] =
                rnDeclarations.value;
            }
          }
        }
      }
    }
  };

  return ruleExit;
}

function getDeclarations(declaration: Declaration) {
  const value = parseValue(declaration.value);

  if (value) {
    return { property: declaration.property, value };
  }

  switch (declaration.property) {
    case "text-shadow":
      return textShadow(declaration);
    case "transform":
      return transform(declaration);
  }
}

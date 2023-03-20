import { Visitor, CustomAtRules, Declaration } from "lightningcss";
import { textShadow } from "./transforms/text-shadow";
import { parseValue } from "./transforms/value";
import { transform } from "./transforms/transform";

export function collectRules(rules: Record<string, Record<string, unknown>>) {
  const ruleExit: Visitor<CustomAtRules>["RuleExit"] = (rule) => {
    if (rule.type !== "style") return rule;

    let ruleRecord: Record<string, unknown> = {};

    for (const declaration of [
      ...rule.value.declarations.declarations,
      ...rule.value.declarations.importantDeclarations,
    ]) {
      const rnDeclarations = getDeclarations(declaration);

      if (!rnDeclarations) {
        continue;
      }

      if (Array.isArray(rnDeclarations)) {
        for (const { property, value } of rnDeclarations) {
          ruleRecord[property] = value;
        }
      } else {
        ruleRecord[rnDeclarations.property] = rnDeclarations.value;
      }
    }

    for (const selectors of rule.value.selectors) {
      for (const selector of selectors) {
        if (selector.type === "class") {
          rules[selector.name] = ruleRecord;
        }
      }
    }
  };

  return ruleExit;
}

function getDeclarations(declaration: Declaration) {
  const value = parseValue(declaration.value);

  if (value) {
    const property = declaration.property.replace(/-./g, (x) =>
      x[1].toUpperCase()
    );
    return { property, value };
  }

  switch (declaration.property) {
    case "text-shadow":
      return textShadow(declaration);
    case "transform":
      return transform(declaration);
  }
}

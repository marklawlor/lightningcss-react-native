import { Declaration } from "lightningcss";
import { textShadow } from "./transforms/text-shadow";
import { parseValue } from "./transforms/value";
import { transform } from "./transforms/transform";

export function getRuleRecord(declarations: Declaration[]) {
  let ruleRecord: Record<string, unknown> = {};

  for (const declaration of declarations) {
    const rnDeclarations = getDeclarations(declaration);

    if (!rnDeclarations) {
      continue;
    }

    if (Array.isArray(rnDeclarations)) {
      for (const { property, value } of rnDeclarations) {
        if (value !== undefined) {
          ruleRecord[property] = value;
        }
      }
    } else if (rnDeclarations.value !== undefined) {
      ruleRecord[rnDeclarations.property] = rnDeclarations.value;
    }
  }

  return ruleRecord;
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

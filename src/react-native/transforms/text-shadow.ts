import { Declaration } from "lightningcss";
import { parseAndMutate, parseValue } from "./value";
import { RNDeclaration } from "../types";

export function textShadow(
  declaration: Declaration & { property: "text-shadow" }
) {
  const declarations: RNDeclaration[] = [];

  for (const value of declaration.value) {
    parseAndMutate(
      { property: "textShadowColor", value: value.color },
      declarations
    );

    parseAndMutate(
      {
        property: "textShadowRadius",
        value: parseValue(value.blur),
      },
      declarations
    );

    declarations.push({
      property: "textShadowOffset",
      value: {
        width: parseValue(value.xOffset),
        height: parseValue(value.yOffset),
      },
    });
  }

  return declarations;
}

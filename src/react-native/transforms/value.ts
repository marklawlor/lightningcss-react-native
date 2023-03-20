import { Length } from "lightningcss";
import { RNDeclaration } from "../types";

export function parseAndCollect(
  declaration: RNDeclaration,
  declarations: RNDeclaration[]
) {
  const value = parseValue(declaration.value);

  if (value) {
    declarations.push({
      property: declaration.property,
      value,
    } as RNDeclaration);
  }
}

export function parseValue(value: RNDeclaration["value"] | Length) {
  if (!(typeof value === "object" && "type" in value)) {
    return undefined;
  }

  switch (value.type) {
    // Unsupported or unimplemented
    case "auto":
    case "none":
    case "currentcolor":
    case "srgb":
    case "lab":
    case "lch":
    case "oklab":
    case "oklch":
    case "srgb-linear":
    case "display-p3":
    case "a98-rgb":
    case "prophoto-rgb":
    case "rec2020":
    case "xyz-d50":
    case "xyz-d65":
    case "hsl":
    case "hwb":
    case "url":
    case "gradient":
    case "image-set":
    case "keyword":
    case "pair":
    case "fit-content-function":
    case "line-style":
    case "baseline-position":
    case "content-distribution":
    case "content-position":
    case "self-position":
    case "legacy":
    case "track-list":
    case "areas":
    case "area":
    case "line":
    case "span":
    case "bolder":
    case "lighter":
    case "relative":
    case "percentage":
    case "from-font":
    case "color":
    case "counter-style":
    case "context-fill":
    case "context-stroke":
    case "calc":
    case "values":
    case "shape":
    case "box":
    case "filters":
    case "names":
      return undefined;
    // Identity types
    case "string":
    case "number":
    case "integer":
      return value.value;
    // Types with no values
    case "normal":
    case "stretch":
    case "left":
    case "right":
    case "contain":
    case "min-content":
    case "max-content":
    case "fit-content":
    case "thin":
    case "medium":
    case "thick":
    case "italic":
    case "oblique":
    case "absolute":
      return value.type;
    case "value":
    case "dimension": {
      const dimension = value.value;
      return dimension.unit === "px"
        ? dimension.value
        : `${dimension.value}${dimension.unit}`;
    }
    case "length":
    case "length-percentage": {
      const length = value.value;

      switch (length.type) {
        case "value":
        case "dimension":
          const dimension = length.value;
          return dimension.unit === "px"
            ? dimension.value
            : `${dimension.value}${dimension.unit}`;
        case "percentage":
          return `${length}%`;
        case "calc":
          return undefined;
      }
    }
    case "rgb":
      return `rgba(${value.r}, ${value.g}, ${value.b}, ${value.alpha})`;
    default:
      throw new Error(`Unknown value type: ${value["type"]}`);
  }
}

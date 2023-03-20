import { Angle, Declaration } from "lightningcss";
import { parseValue } from "./value";

export function transform(
  declaration: Declaration & { property: "transform" }
) {
  const transform = {
    property: "transform",
    value: [] as any[],
  };

  for (const value of declaration.value) {
    switch (value.type) {
      case "perspective":
      case "translateZ":
      case "scaleX":
      case "scaleY":
      case "scaleZ":
      case "translateX":
      case "translateY":
        transform.value.push({
          [value.type]: parseValue(value.value),
        });
        break;
      case "translate": {
        transform.value.push({
          translateX: parseValue(value.value[0]),
          translateY: parseValue(value.value[1]),
        });
        break;
      }
      case "scale": {
        transform.value.push({
          scaleX: parseValue(value.value[0]),
          scaleY: parseValue(value.value[1]),
        });
        break;
      }
      case "skew": {
        transform.value.push({
          skewX: parseAngle(value.value[0]),
          skewY: parseAngle(value.value[1]),
        });
        break;
      }
      case "rotate":
      case "rotateX":
      case "rotateY":
      case "rotateZ":
      case "skewX":
      case "skewY":
        transform.value.push({
          [value.type]: parseAngle(value.value),
        });
        break;
      case "matrix":
        transform.value.push({
          matrix: [
            value.value.a,
            value.value.b,
            value.value.c,
            value.value.d,
            value.value.e,
            value.value.f,
          ],
        });

      default:
        throw new Error(`Unsupported transform: ${value.type}`);
    }
  }

  return transform;
}

function parseAngle(angle: Angle) {
  switch (angle.type) {
    case "deg":
    case "rad":
      return parseValue(angle.value);
    default:
      return undefined;
  }
}

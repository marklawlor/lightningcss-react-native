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
      case "translateY": {
        const _value = parseValue(value.value);
        if (_value !== undefined) {
          transform.value.push({ [value.type]: _value });
        }
        break;
      }
      case "rotate":
      case "rotateX":
      case "rotateY":
      case "rotateZ":
      case "skewX":
      case "skewY":
        const _value = parseAngle(value.value);
        if (_value !== undefined) {
          transform.value.push({ [value.type]: _value });
        }
        break;
      case "translate": {
        const translateX = parseValue(value.value[0]);
        const translateY = parseValue(value.value[1]);
        if (translateX !== undefined || translateY !== undefined) {
          transform.value.push({ translateX, translateY });
        }
        break;
      }
      case "scale": {
        const scaleX = parseValue(value.value[0]);
        const scaleY = parseValue(value.value[1]);
        if (scaleX !== undefined || scaleY !== undefined) {
          transform.value.push({ scaleX, scaleY });
        }
        break;
      }
      case "skew": {
        const skewX = parseAngle(value.value[0]);
        const skewY = parseAngle(value.value[1]);
        if (skewX !== undefined || skewY !== undefined) {
          transform.value.push({ skewX, skewY });
        }
        break;
      }
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
        break;
      default:
        return undefined;
    }
  }

  if (transform.value.length === 0) {
    return undefined;
  }

  return transform;
}

function parseAngle(angle: Angle) {
  switch (angle.type) {
    case "deg":
    case "rad":
      return `${angle.value}${angle.type}`;
    default:
      return undefined;
  }
}

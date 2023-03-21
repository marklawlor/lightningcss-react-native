import { Declaration, Keyframe } from "lightningcss";
import Test, {
  KeyframeProps,
  Keyframe as ReanimatedKeyFrame,
} from "react-native-reanimated";
import { getRuleRecord } from "./get-declarations";

export function keyframes(keyframes: Keyframe<Declaration>[]) {
  const frames: Record<string, KeyframeProps> = {};

  for (const keyframe of keyframes) {
    const ruleRecord = getRuleRecord(
      [
        keyframe.declarations.declarations,
        keyframe.declarations.importantDeclarations,
      ]
        .flat()
        .filter((c): c is Declaration => !!c)
    );

    for (const selector of keyframe.selectors) {
      const key =
        selector.type === "percentage" ? selector.value : selector.type;
      frames[key] = ruleRecord;
    }
  }

  // console.log(111, Test, ReanimatedKeyFrame);

  return {};
}

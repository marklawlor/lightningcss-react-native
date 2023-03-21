import Animated, {
  makeMutable,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { expect, jest, test } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import {
  withReanimatedTimer,
  advanceAnimationByTime,
} from "react-native-reanimated/src/reanimated2/jestUtils";

import { toReactNative } from "../src";

jest.useFakeTimers();

test("animation", () => {
  const styles = toReactNative(`
  .view {
    animation-duration: 500s;
    animation-name: slide;
  }

  @keyframes slide {
    @enter;
    from {
      width: 0px;
    }

    to {
      width: 100px;
    }
  }
    `);

  withReanimatedTimer(() => {
    const style = { width: 0 };

    function Test() {
      const widthSV = useSharedValue(0);
      const style = useAnimatedStyle(() => {
        return {
          width: withTiming(widthSV.value, { duration: 500 }),
        };
      });

      return (
        <Animated.View
          testID="view"
          style={style}
          onPress={() => (widthSV.value = 100)}
        />
      );
    }

    const { getByTestId } = render(<Test />);
    const view = getByTestId("view");

    expect(view).toHaveAnimatedStyle(style);

    fireEvent.press(view);
    advanceAnimationByTime(500);
    style.width = 100;
    expect(view).toHaveAnimatedStyle(style);
  });
});

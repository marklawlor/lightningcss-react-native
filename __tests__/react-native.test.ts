import { expect, test } from "@jest/globals";

/**
 * Please note that this file is ignored from prettier.
* Please try to keep the tests in alphabetical order and on a single line
 */

test("color (keyword)", () => expect("color: red").toRNStyle({ color: "rgba(255, 0, 0, 1)" }));
test("color (rgb)", () => expect("color: rgb(0, 100, 0)").toRNStyle({ color: "rgba(0, 100, 0, 1)" }));
test("transform (matrix)", () => expect("transform: matrix(1, 2, 3, 4, 5, 6)").toRNStyle({ transform: [{ matrix: [1, 2, 3, 4, 5, 6] }] }));
test("transform (matrix3d)", () => expect("transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)").toRNStyle(undefined))
test("transform (perspective)", () => expect("transform: perspective(17px)").toRNStyle({ transform: [{ perspective: 17 }] }));
test("transform (rotate-deg)", () => expect("transform: rotate(17deg)").toRNStyle({ transform: [{ rotate: "17deg" }] }));
test("transform (rotate-rad)", () => expect("transform: rotate(17rad)").toRNStyle({ transform: [{ rotate: "17rad" }] }));
test("transform (rotate-turn)", () => expect("transform: rotate(0.5turn)").toRNStyle(undefined));
test("transform (rotate3d)", () => expect("transform: rotate3d(1, 2, 3, 10deg)").toRNStyle(undefined));

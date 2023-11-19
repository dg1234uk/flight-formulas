import { expect, test } from "vitest";
import type { AngleUnit } from "./unitConversions";
import { convertFromRadians } from "./unitConversions";

test("convertFromRadians: Radians to Radians", () => {
  expect(convertFromRadians(1, "radians")).toBe(1);
});

test("convertFromRadians: Radians to Degrees", () => {
  expect(convertFromRadians(Math.PI, "degrees")).toBe(180);
});

test("convertFromRadians: Invalid unit", () => {
  expect(() => convertFromRadians(1, "invalid" as AngleUnit)).toThrow(
    "Invalid unit for conversion from radians.",
  );
});

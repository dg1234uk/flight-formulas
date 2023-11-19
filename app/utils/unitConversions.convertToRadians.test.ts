import { expect, test } from "vitest";
import type { AngleUnit } from "./unitConversions";
import { convertToRadians } from "./unitConversions";

test("convertToRadians: Radians to Radians", () => {
  expect(convertToRadians(1, "radians")).toBe(1);
});

test("convertToRadians: Degrees to Radians", () => {
  expect(convertToRadians(180, "degrees")).toBe(Math.PI);
});

test("convertToRadians: Invalid unit", () => {
  expect(() => convertToRadians(1, "invalid" as AngleUnit)).toThrow(
    "Invalid unit for conversion to radians.",
  );
});

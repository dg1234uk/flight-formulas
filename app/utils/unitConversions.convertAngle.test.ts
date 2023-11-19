import { expect, test } from "vitest";
import type { AngleUnit } from "./unitConversions";
import { convertAngle } from "./unitConversions";

test("Radians to Radians", () => {
  expect(convertAngle(1, "radians", "radians")).toBe(1);
});

test("Degrees to Degrees", () => {
  expect(convertAngle(180, "degrees", "degrees")).toBe(180);
});

test("Radians to Degrees", () => {
  expect(convertAngle(Math.PI, "radians", "degrees")).toBe(180);
});

test("Degrees to Radians", () => {
  expect(convertAngle(180, "degrees", "radians")).toBe(Math.PI);
});

test("Invalid fromUnit", () => {
  expect(() => convertAngle(1, "invalid" as AngleUnit, "radians")).toThrow(
    "Invalid unit for conversion to radians.",
  );
});

test("Invalid toUnit", () => {
  expect(() => convertAngle(1, "radians", "invalid" as AngleUnit)).toThrow(
    "Invalid unit for conversion from radians.",
  );
});

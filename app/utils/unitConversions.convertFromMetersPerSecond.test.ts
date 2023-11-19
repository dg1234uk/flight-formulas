import { expect, test } from "vitest";
import type { SpeedUnit } from "./unitConversions";
import { convertFromMetersPerSecond } from "./unitConversions";

test("m/s to m/s", () => {
  expect(convertFromMetersPerSecond(1, "m/s")).toBe(1);
});

test("m/s to knots", () => {
  expect(convertFromMetersPerSecond(0.514444, "knots")).toBeCloseTo(1);
});

test("m/s to mph", () => {
  expect(convertFromMetersPerSecond(0.44704, "mph")).toBeCloseTo(1);
});

test("m/s to kph", () => {
  expect(convertFromMetersPerSecond(0.277778, "kph")).toBeCloseTo(1);
});

test("m/s to fps", () => {
  expect(convertFromMetersPerSecond(0.3048, "fps")).toBeCloseTo(1);
});

test("m/s to fpm", () => {
  expect(convertFromMetersPerSecond(0.00508, "fpm")).toBeCloseTo(1);
});

test("Invalid unit", () => {
  expect(() => convertFromMetersPerSecond(1, "invalid" as SpeedUnit)).toThrow(
    "Invalid unit for conversion from meters per second.",
  );
});

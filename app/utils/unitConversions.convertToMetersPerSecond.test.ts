import { expect, test } from "vitest";
import type { SpeedUnit } from "./unitConversions";
import { convertToMetersPerSecond } from "./unitConversions";

test("m/s to m/s", () => {
  expect(convertToMetersPerSecond(1, "m/s")).toBe(1);
});

test("knots to m/s", () => {
  expect(convertToMetersPerSecond(1, "knots")).toBeCloseTo(0.514444);
});

test("mph to m/s", () => {
  expect(convertToMetersPerSecond(1, "mph")).toBeCloseTo(0.44704);
});

test("kph to m/s", () => {
  expect(convertToMetersPerSecond(1, "kph")).toBeCloseTo(0.277778);
});

test("fps to m/s", () => {
  expect(convertToMetersPerSecond(1, "fps")).toBeCloseTo(0.3048);
});

test("fpm to m/s", () => {
  expect(convertToMetersPerSecond(1, "fpm")).toBeCloseTo(0.00508);
});

test("Invalid unit", () => {
  expect(() => convertToMetersPerSecond(1, "invalid" as SpeedUnit)).toThrow(
    "Invalid unit for conversion to meters per second.",
  );
});

import { expect, test } from "vitest";
import type { SpeedUnit } from "./unitConversions";
import { convertSpeed } from "./unitConversions";

test("m/s to m/s", () => {
  expect(convertSpeed(1, "m/s", "m/s")).toBe(1);
});

test("knots to m/s", () => {
  expect(convertSpeed(1, "knots", "m/s")).toBeCloseTo(0.514444);
});

test("mph to m/s", () => {
  expect(convertSpeed(1, "mph", "m/s")).toBeCloseTo(0.44704);
});

test("kph to m/s", () => {
  expect(convertSpeed(1, "kph", "m/s")).toBeCloseTo(0.277778);
});

test("fps to m/s", () => {
  expect(convertSpeed(1, "fps", "m/s")).toBeCloseTo(0.3048);
});

test("fpm to m/s", () => {
  expect(convertSpeed(1, "fpm", "m/s")).toBeCloseTo(0.00508);
});

test("m/s to knots", () => {
  expect(convertSpeed(0.514444, "m/s", "knots")).toBeCloseTo(1);
});

test("m/s to mph", () => {
  expect(convertSpeed(0.44704, "m/s", "mph")).toBeCloseTo(1);
});

test("m/s to kph", () => {
  expect(convertSpeed(0.277778, "m/s", "kph")).toBeCloseTo(1);
});

test("m/s to fps", () => {
  expect(convertSpeed(0.3048, "m/s", "fps")).toBeCloseTo(1);
});

test("m/s to fpm", () => {
  expect(convertSpeed(0.00508, "m/s", "fpm")).toBeCloseTo(1);
});

test("Invalid fromUnit", () => {
  expect(() => convertSpeed(1, "invalid" as SpeedUnit, "m/s")).toThrow(
    "Invalid unit for conversion to meters per second.",
  );
});

test("Invalid toUnit", () => {
  expect(() => convertSpeed(1, "m/s", "invalid" as SpeedUnit)).toThrow(
    "Invalid unit for conversion from meters per second.",
  );
});

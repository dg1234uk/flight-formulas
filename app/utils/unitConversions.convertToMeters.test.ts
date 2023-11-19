import { expect, test } from "vitest";
import type { LengthUnit } from "./unitConversions";
import { convertToMeters } from "./unitConversions";

test("Meters to Meters", () => {
  expect(convertToMeters(1, "meters")).toBe(1);
});

test("Feet to Meters", () => {
  expect(convertToMeters(1, "feet")).toBeCloseTo(0.3048);
});

test("Nautical Miles to Meters", () => {
  expect(convertToMeters(1, "nauticalMiles")).toBe(1852);
});

test("Kilometers to Meters", () => {
  expect(convertToMeters(1, "kilometers")).toBe(1000);
});

test("Miles to Meters", () => {
  expect(convertToMeters(1, "miles")).toBeCloseTo(1609.34);
});

test("Invalid unit", () => {
  expect(() => convertToMeters(1, "invalid" as LengthUnit)).toThrow(
    "Invalid unit for conversion to meters.",
  );
});

import { expect, test } from "vitest";
import type { LengthUnit } from "./unitConversions";
import { convertFromMeters } from "./unitConversions";

test("Meters to Meters", () => {
  expect(convertFromMeters(1, "meters")).toBe(1);
});

test("Meters to Feet", () => {
  expect(convertFromMeters(0.3048, "feet")).toBeCloseTo(1);
});

test("Meters to Nautical Miles", () => {
  expect(convertFromMeters(1852, "nauticalMiles")).toBeCloseTo(1);
});

test("Meters to Kilometers", () => {
  expect(convertFromMeters(1000, "kilometers")).toBe(1);
});

test("Meters to Miles", () => {
  expect(convertFromMeters(1609.34, "miles")).toBeCloseTo(1);
});

test("Invalid unit", () => {
  expect(() => convertFromMeters(1, "invalid" as LengthUnit)).toThrow(
    "Invalid unit for conversion from meters.",
  );
});

import { expect, test } from "vitest";
import type { LengthUnit } from "./unitConversions";
import { convertLength } from "./unitConversions";

test("Meters to Meters", () => {
  expect(convertLength(1, "meters", "meters")).toBe(1);
});

test("Feet to Meters", () => {
  expect(convertLength(1, "feet", "meters")).toBeCloseTo(0.3048);
});

test("Nautical Miles to Meters", () => {
  expect(convertLength(1, "nauticalMiles", "meters")).toBe(1852);
});

test("Kilometers to Meters", () => {
  expect(convertLength(1, "kilometers", "meters")).toBe(1000);
});

test("Miles to Meters", () => {
  expect(convertLength(1, "miles", "meters")).toBeCloseTo(1609.34);
});

test("Meters to Feet", () => {
  expect(convertLength(0.3048, "meters", "feet")).toBeCloseTo(1);
});

test("Meters to Nautical Miles", () => {
  expect(convertLength(1852, "meters", "nauticalMiles")).toBe(1);
});

test("Meters to Kilometers", () => {
  expect(convertLength(1000, "meters", "kilometers")).toBe(1);
});

test("Meters to Miles", () => {
  expect(convertLength(1609.34, "meters", "miles")).toBeCloseTo(1);
});

test("Invalid fromUnit", () => {
  expect(() => convertLength(1, "invalid" as LengthUnit, "meters")).toThrow(
    "Invalid unit for conversion to meters.",
  );
});

test("Invalid toUnit", () => {
  expect(() => convertLength(1, "meters", "invalid" as LengthUnit)).toThrow(
    "Invalid unit for conversion from meters.",
  );
});

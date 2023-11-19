import { expect, test } from "vitest";
import { convertToKelvin } from "~/utils/unitConversions";

test("should correctly convert from Kelvin to Kelvin", () => {
  expect(convertToKelvin(100, "kelvin")).toBe(100);
});

test("should correctly convert from Celsius to Kelvin", () => {
  expect(convertToKelvin(0, "celsius")).toBe(273.15);
});

test("should correctly convert from Fahrenheit to Kelvin", () => {
  expect(convertToKelvin(32, "fahrenheit")).toBeCloseTo(273.15, 2);
});

test("should correctly convert from Rankine to Kelvin", () => {
  expect(convertToKelvin(491.67, "rankine")).toBeCloseTo(273.15, 2);
});

test("should throw an error for an invalid unit", () => {
  // @ts-expect-error - intentionally passing an invalid unit
  expect(() => convertToKelvin(100, "invalid")).toThrow(
    "Invalid unit for conversion to meters.",
  );
});

import { expect, test } from "vitest";
import type { TemperatureUnit } from "~/utils/unitConversions";
import { convertFromKelvin } from "~/utils/unitConversions";

test("should correctly convert from Kelvin to Kelvin", () => {
  expect(convertFromKelvin(100, "kelvin")).toBe(100);
});

test("should correctly convert from Kelvin to Celsius", () => {
  expect(convertFromKelvin(273.15, "celsius")).toBe(0);
});

test("should correctly convert from Kelvin to Fahrenheit", () => {
  expect(convertFromKelvin(273.15, "fahrenheit")).toBeCloseTo(32, 2);
});

test("should correctly convert from Kelvin to Rankine", () => {
  expect(convertFromKelvin(273.15, "rankine")).toBeCloseTo(491.67, 2);
});

test("should throw an error for an invalid unit", () => {
  expect(() => convertFromKelvin(100, "invalid" as TemperatureUnit)).toThrow(
    "Invalid unit for conversion from kelvin.",
  );
});

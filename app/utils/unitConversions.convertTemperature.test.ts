import { expect, test } from "vitest";
import { convertTemperature } from "./unitConversions";

test("Kelvin to Kelvin", () => {
  expect(convertTemperature(100, "kelvin", "kelvin")).toBe(100);
});

test("Celsius to Kelvin", () => {
  expect(convertTemperature(0, "celsius", "kelvin")).toBe(273.15);
});

test("Fahrenheit to Kelvin", () => {
  expect(convertTemperature(32, "fahrenheit", "kelvin")).toBeCloseTo(273.15, 2);
});

test("Rankine to Kelvin", () => {
  expect(convertTemperature(491.67, "rankine", "kelvin")).toBeCloseTo(
    273.15,
    2,
  );
});

test("Kelvin to Celsius", () => {
  expect(convertTemperature(273.15, "kelvin", "celsius")).toBe(0);
});

test("Kelvin to Fahrenheit", () => {
  expect(convertTemperature(273.15, "kelvin", "fahrenheit")).toBeCloseTo(32, 2);
});

test("Kelvin to Rankine", () => {
  expect(convertTemperature(273.15, "kelvin", "rankine")).toBeCloseTo(
    491.67,
    2,
  );
});

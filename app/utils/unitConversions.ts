// Speed
export const KNOTS_TO_METERS_PER_SECOND = 0.514444;
const MPH_TO_METERS_PER_SECOND = 0.44704;
const KPH_TO_METERS_PER_SECOND = 0.277778;
const FPS_TO_METERS_PER_SECOND = 0.3048;
const FPM_TO_METERS_PER_SECOND = 0.00508;

// Length
const FEET_TO_METERS = 0.3048;
const NAUTICAL_MILES_TO_METERS = 1852;
const KM_TO_METERS = 1000;
const MILES_TO_METERS = 1609.34;

// Angle
const DEGREES_TO_RADIANS = Math.PI / 180;
const RADIANS_TO_DEGREES = 180 / Math.PI;

// Temperature
const ZERO_CELSIUS_KELVIN_OFFSET = 273.15;
const RATIO_FAHRENHEIT_TO_KELVIN = 5 / 9;
const ZERO_CELSIUS_IN_FAHRENHEIT = 32;

// Constants
export const g = 9.81; // Acceleration due to gravity in m/s^2

export const SpeedUnits = ["m/s", "knots", "mph", "kph", "fps", "fpm"] as const;
export const LengthUnits = [
  "meters",
  "feet",
  "nauticalMiles",
  "kilometers",
  "miles",
] as const;
export const AngleUnits = ["degrees", "radians"] as const;
export const TemperatureUnits = [
  "celsius",
  "fahrenheit",
  "kelvin",
  "rankine",
] as const;

export type SpeedUnit = (typeof SpeedUnits)[number];
export type LengthUnit = (typeof LengthUnits)[number];
export type AngleUnit = (typeof AngleUnits)[number];
export type TemperatureUnit = (typeof TemperatureUnits)[number];

// type MassUnit = "kilograms" | "pounds";
// type VolumeUnit = "litres" | "gallons";
// type DensityUnit = "kilogramsPerCubicMeter" | "poundsPerCubicFoot";

type SpeedObject = Record<SpeedUnit, string>;
export const speedLabels: SpeedObject = {
  "m/s": "Meters Per Second",
  knots: "Knots",
  mph: "Miles per hour",
  kph: "Kilometers per hour",
  fps: "Feet per second",
  fpm: "Feet per minute",
};

type LengthObject = Record<LengthUnit, string>;
export const lengthLabels: LengthObject = {
  meters: "Meters",
  feet: "Feet",
  nauticalMiles: "Nautical Miles",
  kilometers: "Kilometers",
  miles: "Miles",
};

type AngleObject = Record<AngleUnit, string>;
export const angleLables: AngleObject = {
  degrees: "Degrees",
  radians: "Radians",
};

type TemperatureObject = Record<TemperatureUnit, string>;
export const temperatureLabels: TemperatureObject = {
  celsius: "Celsius",
  fahrenheit: "Fahrenheit",
  kelvin: "Kelvin",
  rankine: "Rankine",
};

export type ValueUnitPair<UnitType> = {
  value: number;
  unit: UnitType;
};

export function isSpeedUnit(unit: string): unit is SpeedUnit {
  return (SpeedUnits as readonly string[]).includes(unit);
}

export function isDirectionUnit(unit: string): unit is AngleUnit {
  return (AngleUnits as readonly string[]).includes(unit);
}

export function isLengthUnit(unit: string): unit is LengthUnit {
  return (LengthUnits as readonly string[]).includes(unit);
}

export function convertToMetersPerSecond(speed: number, unit: SpeedUnit) {
  switch (unit) {
    case "m/s":
      return speed;
    case "knots":
      return speed * KNOTS_TO_METERS_PER_SECOND;
    case "mph":
      return speed * MPH_TO_METERS_PER_SECOND;
    case "kph":
      return speed * KPH_TO_METERS_PER_SECOND;
    case "fps":
      return speed * FPS_TO_METERS_PER_SECOND;
    case "fpm":
      return speed * FPM_TO_METERS_PER_SECOND;
    default:
      throw new Error("Invalid unit for conversion to meters per second.");
  }
}

export function convertFromMetersPerSecond(speed: number, unit: SpeedUnit) {
  switch (unit) {
    case "m/s":
      return speed;
    case "knots":
      return speed / KNOTS_TO_METERS_PER_SECOND;
    case "mph":
      return speed / MPH_TO_METERS_PER_SECOND;
    case "kph":
      return speed / KPH_TO_METERS_PER_SECOND;
    case "fps":
      return speed / FPS_TO_METERS_PER_SECOND;
    case "fpm":
      return speed / FPM_TO_METERS_PER_SECOND;
    default:
      throw new Error("Invalid unit for conversion from meters per second.");
  }
}

export function convertSpeed(
  speed: number,
  fromUnit: SpeedUnit,
  toUnit: SpeedUnit,
) {
  return convertFromMetersPerSecond(
    convertToMetersPerSecond(speed, fromUnit),
    toUnit,
  );
}

export function convertToMeters(length: number, unit: LengthUnit) {
  switch (unit) {
    case "meters":
      return length;
    case "feet":
      return length * FEET_TO_METERS;
    case "nauticalMiles":
      return length * NAUTICAL_MILES_TO_METERS;
    case "kilometers":
      return length * KM_TO_METERS;
    case "miles":
      return length * MILES_TO_METERS;
    default:
      throw new Error("Invalid unit for conversion to meters.");
  }
}

export function convertFromMeters(length: number, unit: LengthUnit) {
  switch (unit) {
    case "meters":
      return length;
    case "feet":
      return length / FEET_TO_METERS;
    case "nauticalMiles":
      return length / NAUTICAL_MILES_TO_METERS;
    case "kilometers":
      return length / KM_TO_METERS;
    case "miles":
      return length / MILES_TO_METERS;
    default:
      throw new Error("Invalid unit for conversion from meters.");
  }
}

export function convertLength(
  length: number,
  fromUnit: LengthUnit,
  toUnit: LengthUnit,
) {
  return convertFromMeters(convertToMeters(length, fromUnit), toUnit);
}

export function convertToRadians(angle: number, unit: AngleUnit = "degrees") {
  switch (unit) {
    case "radians":
      return angle;
    case "degrees":
      return angle * DEGREES_TO_RADIANS;
    default:
      throw new Error("Invalid unit for conversion to radians.");
  }
}

export function convertFromRadians(angle: number, unit: AngleUnit = "degrees") {
  switch (unit) {
    case "radians":
      return angle;
    case "degrees":
      return angle * RADIANS_TO_DEGREES;
    default:
      throw new Error("Invalid unit for conversion from radians.");
  }
}

export function convertAngle(
  angle: number,
  fromUnit: AngleUnit,
  toUnit: AngleUnit,
) {
  return convertFromRadians(convertToRadians(angle, fromUnit), toUnit);
}

export function convertToKelvin(temperature: number, unit: TemperatureUnit) {
  switch (unit) {
    case "kelvin":
      return temperature;
    case "celsius":
      return temperature + ZERO_CELSIUS_KELVIN_OFFSET;
    case "fahrenheit":
      return (
        (temperature - ZERO_CELSIUS_IN_FAHRENHEIT) *
          RATIO_FAHRENHEIT_TO_KELVIN +
        ZERO_CELSIUS_KELVIN_OFFSET
      );
    case "rankine":
      return temperature * RATIO_FAHRENHEIT_TO_KELVIN;
    default:
      throw new Error("Invalid unit for conversion to kelvin.");
  }
}

export function convertFromKelvin(temperature: number, unit: TemperatureUnit) {
  switch (unit) {
    case "kelvin":
      return temperature;
    case "celsius":
      return temperature - ZERO_CELSIUS_KELVIN_OFFSET;
    case "fahrenheit":
      return (
        (temperature - ZERO_CELSIUS_KELVIN_OFFSET) /
          RATIO_FAHRENHEIT_TO_KELVIN +
        ZERO_CELSIUS_IN_FAHRENHEIT
      );
    case "rankine":
      return temperature / RATIO_FAHRENHEIT_TO_KELVIN;
    default:
      throw new Error("Invalid unit for conversion from kelvin.");
  }
}

export function convertTemperature(
  temperature: number,
  fromUnit: TemperatureUnit,
  toUnit: TemperatureUnit,
) {
  return convertFromKelvin(convertToKelvin(temperature, fromUnit), toUnit);
}

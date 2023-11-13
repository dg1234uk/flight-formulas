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

// Direction
const DEGREES_TO_RADIANS = Math.PI / 180;
const RADIANS_TO_DEGREES = 180 / Math.PI;

export const SpeedUnits = ["m/s", "knots", "mph", "kph", "fps", "fpm"] as const;
export const DirectionUnits = ["degrees", "radians"] as const;
export const LengthUnits = [
  "meters",
  "feet",
  "nauticalMiles",
  "kilometers",
  "miles",
] as const;

export type SpeedUnit = (typeof SpeedUnits)[number];
export type DirectionUnit = (typeof DirectionUnits)[number];
export type LengthUnit = (typeof LengthUnits)[number];

// type MassUnit = "kilograms" | "pounds";
// type TemperatureUnit = "celsius" | "fahrenheit";
// type VolumeUnit = "liters" | "gallons";
// type DensityUnit = "kilogramsPerCubicMeter" | "poundsPerCubicFoot";

export type ValueUnitPair<UnitType> = {
  value: number;
  unit: UnitType;
};

export function isSpeedUnit(unit: string): unit is SpeedUnit {
  return (SpeedUnits as readonly string[]).includes(unit);
}

export function isDirectionUnit(unit: string): unit is DirectionUnit {
  return (DirectionUnits as readonly string[]).includes(unit);
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

export function convertToRadians(
  direction: number,
  unit: DirectionUnit = "degrees",
) {
  if (unit !== "degrees" && unit !== "radians") {
    throw new Error("Invalid unit for conversion to Radians.");
  }
  return unit === "degrees" ? direction * DEGREES_TO_RADIANS : direction;
}

export function convertToDegrees(
  direction: number,
  unit: DirectionUnit = "radians",
) {
  if (unit !== "degrees" && unit !== "radians") {
    throw new Error("Invalid unit for conversion to Degrees.");
  }
  return unit === "radians" ? direction * RADIANS_TO_DEGREES : direction;
}

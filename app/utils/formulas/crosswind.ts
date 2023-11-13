import type {
  DirectionUnit,
  SpeedUnit,
  ValueUnitPair,
} from "../unitConversions";
import { convertSpeed, convertToRadians } from "../unitConversions";

/**
 * Calculates the crosswind component of the wind on a runway.
 *
 * @param {number} windSpeed - The speed of the wind in meters per second.
 * @param {number} windDirection - The direction of the wind in radians.
 * @param {number} runwayDirection - The direction of the runway in radians.
 * @returns {number} The absolute value of the crosswind component.
 */
export function calculateCrosswind(
  windSpeed: number,
  windDirection: number,
  runwayDirection: number,
) {
  // Calculate the angle between the wind and the runway
  const angleDifference = windDirection - runwayDirection;

  // Calculate the crosswind component
  const crosswindComponent = Math.sin(angleDifference) * windSpeed;

  // Return the absolute value of crosswindComponent since we're typically interested in the magnitude
  return Math.abs(crosswindComponent);
}

/**
 * Calculates the crosswind component given the wind speed, wind direction, and runway direction.
 *
 * @param {ValueUnitPair<SpeedUnit>} windSpeedUnitPair - The wind speed value and its unit.
 * @param {ValueUnitPair<DirectionUnit>} windDirectionUnitPair - The wind direction value and its unit.
 * @param {ValueUnitPair<DirectionUnit>} runwayDirectionUnitPair - The runway direction value and its unit.
 *
 * @returns {ValueUnitPair<SpeedUnit>} The crosswind component value in meters per second and its unit.
 */
export function calculateCrosswindWithUnits(
  windSpeedUnitPair: ValueUnitPair<SpeedUnit>,
  windDirectionUnitPair: ValueUnitPair<DirectionUnit>,
  runwayDirectionUnitPair: ValueUnitPair<DirectionUnit>,
) {
  // Convert all inputs to the standard units using the object properties
  const windSpeedInMetersPerSecond = convertSpeed(
    windSpeedUnitPair.value,
    windSpeedUnitPair.unit,
    "m/s",
  );
  const windDirectionInRadians = convertToRadians(
    windDirectionUnitPair.value,
    windDirectionUnitPair.unit,
  );
  const runwayDirectionInRadians = convertToRadians(
    runwayDirectionUnitPair.value,
    runwayDirectionUnitPair.unit,
  );

  // Calculate the crosswind component
  const crosswindComponentValue = calculateCrosswind(
    windSpeedInMetersPerSecond,
    windDirectionInRadians,
    runwayDirectionInRadians,
  );

  // Package the result with the unit
  const crosswindUnitPiar: ValueUnitPair<SpeedUnit> = {
    value: crosswindComponentValue,
    unit: "m/s",
  };

  // Return the result object
  return crosswindUnitPiar;
}

import type { AngleUnit, SpeedUnit, ValueUnitPair } from "../unitConversions";
import { convertSpeed, convertToRadians } from "../unitConversions";

/**
 * Calculates the headwind component of the wind on a runway.
 *
 * @param {number} windSpeed - The speed of the wind in meters per second.
 * @param {number} windDirection - The direction of the wind in radians.
 * @param {number} runwayDirection - The direction of the runway in radians.
 * @returns {number} The absolute value of the headwind component.
 */
export function calculateHeadwind(
  windSpeed: number,
  windDirection: number,
  runwayDirection: number,
) {
  // Calculate the angle between the wind and the runway
  const angleDifference = windDirection - runwayDirection;

  // Calculate the headwind component
  const headwindComponent = Math.cos(angleDifference) * windSpeed;

  // Return the absolute value of headwindComponent since we're typically interested in the magnitude
  return Math.abs(headwindComponent);
}

/**
 * Calculates the headwind component given the wind speed, wind direction, and runway direction.
 *
 * @param {ValueUnitPair<SpeedUnit>} windSpeedUnitPair - The wind speed value and its unit.
 * @param {ValueUnitPair<AngleUnit>} windDirectionUnitPair - The wind direction value and its unit.
 * @param {ValueUnitPair<AngleUnit>} runwayDirectionUnitPair - The runway direction value and its unit.
 *
 * @returns {ValueUnitPair<SpeedUnit>} The headwind component value in meters per second and its unit.
 */
export function calculateHeadwindWithUnits(
  windSpeedUnitPair: ValueUnitPair<SpeedUnit>,
  windDirectionUnitPair: ValueUnitPair<AngleUnit>,
  runwayDirectionUnitPair: ValueUnitPair<AngleUnit>,
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

  // Calculate the headwind component
  const headwindComponentValue = calculateHeadwind(
    windSpeedInMetersPerSecond,
    windDirectionInRadians,
    runwayDirectionInRadians,
  );

  // Package the result with the unit
  const headwindUnitPair: ValueUnitPair<SpeedUnit> = {
    value: headwindComponentValue,
    unit: "m/s",
  };

  // Return the result object
  return headwindUnitPair;
}

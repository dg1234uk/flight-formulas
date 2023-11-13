import type {
  DirectionUnit,
  SpeedUnit,
  ValueUnitPair,
} from "../unitConversions";
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
 * @param {ValueUnitPair<SpeedUnit>} windSpeedObj - The wind speed value and its unit.
 * @param {ValueUnitPair<DirectionUnit>} windDirectionObj - The wind direction value and its unit.
 * @param {ValueUnitPair<DirectionUnit>} runwayDirectionObj - The runway direction value and its unit.
 *
 * @returns {ValueUnitPair<SpeedUnit>} The headwind component value in meters per second and its unit.
 */
export function calculateHeadwindWithUnits(
  windSpeedObj: ValueUnitPair<SpeedUnit>,
  windDirectionObj: ValueUnitPair<DirectionUnit>,
  runwayDirectionObj: ValueUnitPair<DirectionUnit>,
) {
  // Convert all inputs to the standard units using the object properties
  const windSpeedInMetersPerSecond = convertSpeed(
    windSpeedObj.value,
    windSpeedObj.unit,
    "m/s",
  );
  const windDirectionInRadians = convertToRadians(
    windDirectionObj.value,
    windDirectionObj.unit,
  );
  const runwayDirectionInRadians = convertToRadians(
    runwayDirectionObj.value,
    runwayDirectionObj.unit,
  );

  // Calculate the headwind component
  const headwindComponentValue = calculateHeadwind(
    windSpeedInMetersPerSecond,
    windDirectionInRadians,
    runwayDirectionInRadians,
  );

  // Package the result with the unit
  const headwindComponent: ValueUnitPair<SpeedUnit> = {
    value: headwindComponentValue,
    unit: "m/s",
  };

  // Return the result object
  return headwindComponent;
}

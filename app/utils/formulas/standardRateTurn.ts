import type { SpeedUnit, ValueUnitPair } from "../unitConversions";
import { convertSpeed, convertToRadians, g } from "../unitConversions";

/**
 * Calculates the standard rate bank angle for a given velocity.
 *
 * @param {number} velocity - The velocity at which the turn is being made in meters / second.
 * @returns {number} The calculated standard rate bank angle in radians
 */
export function calculateStandardRateBankAngle(velocity: number) {
  const rateOfTurn = convertToRadians(3); // 3 degrees per second
  return Math.atan((velocity * rateOfTurn) / g);
}

export function calculateStandardRateBankAngleWithUnits(
  velocity: ValueUnitPair<SpeedUnit>,
) {
  const velocityInMetersPerSecond = convertSpeed(
    velocity.value,
    velocity.unit,
    "m/s",
  );

  const bankAngle = calculateStandardRateBankAngle(velocityInMetersPerSecond);

  return bankAngle;
}

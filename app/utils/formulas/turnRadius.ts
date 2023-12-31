import type {
  AngleUnit,
  LengthUnit,
  SpeedUnit,
  ValueUnitPair,
} from "../unitConversions";
import { convertSpeed, convertToRadians, g } from "../unitConversions";

/**
 * Calculates the turn radius of an aircraft.
 *
 * @param {number} velocity - The velocity of the aircraft in m/s.
 * @param {number} bankAngle - The bank angle of the aircraft in radians.
 * @returns {number} The turn radius in meters.
 */
export function calculateTurnRadius(velocity: number, bankAngle: number) {
  const radius = velocity ** 2 / (g * Math.tan(bankAngle));
  return radius;
}

/**
 * Calculates the turn radius of an aircraft with units.
 *
 * @param {ValueUnitPair<SpeedUnit>} velocityPair - The velocity of the aircraft along with its unit.
 * @param {ValueUnitPair<AngleUnit>} bankAnglePair - The bank angle of the aircraft along with its unit.
 * @returns {ValueUnitPair<LengthUnit>} The turn radius along with its unit.
 */
export function calculateTurnRadiusWithUnits(
  velocityPair: ValueUnitPair<SpeedUnit>,
  bankAnglePair: ValueUnitPair<AngleUnit>,
) {
  const tasInMetersPerSecond = convertSpeed(
    velocityPair.value,
    velocityPair.unit,
    "m/s",
  );
  const bankAngleInRadians = convertToRadians(
    bankAnglePair.value,
    bankAnglePair.unit,
  );

  const radius = calculateTurnRadius(tasInMetersPerSecond, bankAngleInRadians);

  const radiusUnitPair: ValueUnitPair<LengthUnit> = {
    value: radius,
    unit: "meters",
  };

  return radiusUnitPair;
}

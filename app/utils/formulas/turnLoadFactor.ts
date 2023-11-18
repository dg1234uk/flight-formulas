import type { AngleUnit, ValueUnitPair } from "../unitConversions";
import { convertToRadians } from "../unitConversions";

/**
 * Calculates the load factor in a turn for an aircraft.
 *
 * @param {number} bankAngle - The bank angle of the aircraft in radians.
 * @returns {number} The load factor (also known as g-force) in the turn.
 */
export function calculateTurnLoadFactor(bankAngle: number) {
  return 1 / Math.cos(bankAngle);
}

/**
 * Calculates the load factor in a turn for an aircraft with units.
 *
 * @param {ValueUnitPair<AngleUnit>} bankAnglePair - The bank angle of the aircraft along with its unit.
 * @returns {number} The load factor (also known as g-force) in the turn.
 */
export function calculateTurnLoadFactorWithUnits(
  bankAnglePair: ValueUnitPair<AngleUnit>,
) {
  const bankAngleInRadians = convertToRadians(
    bankAnglePair.value,
    bankAnglePair.unit,
  );

  const loadFactor = calculateTurnLoadFactor(bankAngleInRadians);

  return loadFactor;
}

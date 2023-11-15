import type {
  DirectionUnit,
  SpeedUnit,
  ValueUnitPair,
} from "../unitConversions";
import { convertSpeed, convertToRadians, g } from "../unitConversions";

/**
 * Calculates the rate of turn in radians per second.
 *
 * @param {number} tas - True airspeed in meters per second.
 * @param {number} bankAngle - Bank angle in radians.
 * @returns {number} The rate of turn in radians per second.
 */
export function calculateTurnRate(tas: number, bankAngle: number) {
  // Calculate the rate of turn
  const rot = (g * Math.tan(bankAngle)) / tas;

  return rot; // The rate of turn in radians per second
}

export function calculateTurnRateWithUnits(
  velocityPair: ValueUnitPair<SpeedUnit>,
  bankAnglePair: ValueUnitPair<DirectionUnit>,
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

  const rateOfTurn = calculateTurnRate(
    tasInMetersPerSecond,
    bankAngleInRadians,
  );

  const rateUnitPair: ValueUnitPair<DirectionUnit> = {
    value: rateOfTurn,
    unit: "radians",
  };

  return rateUnitPair;
}

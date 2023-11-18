import type { AngleUnit, SpeedUnit, ValueUnitPair } from "../unitConversions";
import { convertSpeed, convertToRadians } from "../unitConversions";

/**
 * Calculates the rate of climb for an aircraft.
 *
 * @param {number} tas - The True Airspeed (TAS) of the aircraft in m/s.
 * @param {number} fpa - The Flight Path Angle (FPA) of the aircraft in radians.
 * @returns {number} The rate of climb in feet per minute.
 */
export function calculateRateOfClimb(tas: number, fpa: number) {
  const roc = Math.sin(fpa) * tas;
  return roc;
}

/**
 * Calculates the rate of climb for an aircraft with units.
 *
 * @param {ValueUnitPair<SpeedUnit>} tasUnitPair - The True Airspeed (TAS) of the aircraft along with its unit.
 * @param {ValueUnitPair<AngleUnit>} fpaUnitPair - The Flight Path Angle (FPA) of the aircraft along with its unit.
 * @returns {ValueUnitPair<SpeedUnit>} The rate of climb along with its unit.
 */
export function calculateRateOfClimbWithUnits(
  tasUnitPair: ValueUnitPair<SpeedUnit>,
  fpaUnitPair: ValueUnitPair<AngleUnit>,
) {
  const tasInMetersPerSecond = convertSpeed(
    tasUnitPair.value,
    tasUnitPair.unit,
    "m/s",
  );
  const fpaInRadians = convertToRadians(fpaUnitPair.value, fpaUnitPair.unit);

  const roc = calculateRateOfClimb(tasInMetersPerSecond, fpaInRadians);

  const rocUnitPair: ValueUnitPair<SpeedUnit> = {
    value: roc,
    unit: "m/s",
  };

  return rocUnitPair;
}

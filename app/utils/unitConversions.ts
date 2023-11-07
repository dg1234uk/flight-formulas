export const KNOTS_TO_METERS_PER_SECOND = 0.514444;
export const NAUTICAL_MILES_TO_METERS = 1852;

export function knotsToMetersPerSecond(knots: number) {
  return knots * KNOTS_TO_METERS_PER_SECOND;
}

export function metersPerSecondToKnots(mps: number) {
  return mps / KNOTS_TO_METERS_PER_SECOND;
}

export function radiansToDegrees(radians: number) {
  return radians * (180 / Math.PI);
}

export function degreesToRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

export function nauticalMilesToMeters(nauticalMiles: number) {
  return nauticalMiles * NAUTICAL_MILES_TO_METERS;
}

export function metersToNauticalMiles(meters: number) {
  return meters / NAUTICAL_MILES_TO_METERS;
}

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
  console.log(windSpeed, windDirection, runwayDirection);
  // Calculate the angle between the wind and the runway
  const angleDifference = windDirection - runwayDirection;

  // Calculate the crosswind component
  const crosswindComponent = Math.sin(angleDifference) * windSpeed;

  // Return the absolute value of crosswindComponent since we're typically interested in the magnitude
  return Math.abs(crosswindComponent);
}

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  degreesToRadians,
  knotsToMetersPerSecond,
  metersPerSecondToKnots,
} from "~/utils/unitConversions";

export default function Crosswind() {
  const [crosswind, setCrosswind] = useState<number | null>(null);

  /**
   * Calculates the crosswind component of the wind on a runway.
   *
   * @param {number} windSpeed - The speed of the wind in meters per second.
   * @param {number} windDirection - The direction of the wind in radians.
   * @param {number} runwayDirection - The direction of the runway in radians.
   * @returns {number} The absolute value of the crosswind component.
   */
  function calculateCrosswind(
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

  function handleCalculate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // using react get the values from the three inputs
    const windSpeed = Number(event.currentTarget.elements.windSpeed.value);
    const runwayDirection = Number(
      event.currentTarget.elements.runwayDirection.value,
    );
    const windDirection = Number(
      event.currentTarget.elements.windDirection.value,
    );

    const windSpeedInMPS = knotsToMetersPerSecond(windSpeed);
    const runwayDirectionInRadians = degreesToRadians(runwayDirection);
    const windDirectionInRadians = degreesToRadians(windDirection);

    const crosswindComponentInMPS = calculateCrosswind(
      windSpeedInMPS,
      windDirectionInRadians,
      runwayDirectionInRadians,
    );

    const crosswindComponent = metersPerSecondToKnots(crosswindComponentInMPS);

    setCrosswind(crosswindComponent);
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium">Crosswind Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCalculate}>
            <Input
              className="mb-2"
              placeholder="Wind speed (knots)"
              type="number"
              name="windSpeed"
            />
            <Input
              className="mb-2"
              placeholder="Runway direction (degrees)"
              type="number"
              name="runwayDirection"
            />
            <Input
              className="mb-2"
              placeholder="Wind direction (degrees)"
              type="number"
              name="windDirection"
            />
            <Button type="submit" variant="default">
              Calculate
            </Button>
          </form>
          <p className="mt-4 text-lg font-semibold">
            Crosswind Component:
            <span className="text-blue-500 dark:text-blue-300">
              {crosswind ? crosswind : "N/A"}
            </span>
          </p>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardContent>
          <article className="prose dark:prose-dark max-w-none">
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              How the Crosswind Calculator Works
            </h3>
            <p>
              The crosswind calculator uses trigonometric functions to calculate
              the crosswind component based on the wind speed, runway direction,
              and wind direction.
            </p>
            <p>
              The formula used is: Crosswind = Wind Speed * sin(Wind Direction -
              Runway Direction).
            </p>
          </article>
        </CardContent>
      </Card>
    </>
  );
}

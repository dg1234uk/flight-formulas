import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { calculateCrosswindWithUnits } from "~/utils/calculators";
import type {
  DirectionUnit,
  SpeedUnit,
  ValueUnitPair,
} from "~/utils/unitConversions";
import { convertSpeed } from "~/utils/unitConversions";

function inputCheck(value: any, message?: string) {
  if (!value || typeof value !== "string") {
    console.error(message || "An invariant failed");
  }
}

export default function Crosswind() {
  const [crosswind, setCrosswind] = useState<number>();

  function handleCalculate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    const windSpeedInput = form.elements.namedItem(
      "windSpeed",
    ) as HTMLInputElement;
    const runwayDirectionInput = form.elements.namedItem(
      "runwayDirection",
    ) as HTMLInputElement;
    const windDirectionInput = form.elements.namedItem(
      "windDirection",
    ) as HTMLInputElement;

    const windSpeedUnitsGroup = form.elements.namedItem(
      "windSpeedUnits",
    ) as RadioNodeList;
    const runwayDirectionUnitsGroup = form.elements.namedItem(
      "runwayDirectionUnits",
    ) as RadioNodeList;
    const windDirectionUnitsGroup = form.elements.namedItem(
      "windDirectionUnits",
    ) as RadioNodeList;

    const windSpeedUnits = windSpeedUnitsGroup[1] as HTMLSelectElement;
    const runwayDirectionUnits =
      runwayDirectionUnitsGroup[1] as HTMLSelectElement;
    const windDirectionUnits = windDirectionUnitsGroup[1] as HTMLSelectElement;

    inputCheck(windSpeedInput.value, "Wind Speed required");
    inputCheck(runwayDirectionInput.value, "Runway Direction required");
    inputCheck(windDirectionInput.value, "Wind Direction required");
    inputCheck(windSpeedUnits.value, "Wind Speed Units required");
    inputCheck(runwayDirectionUnits.value, "Runway Direction Units required");
    inputCheck(windDirectionUnits.value, "Wind Direction Units required");

    const windSpeed: ValueUnitPair<SpeedUnit> = {
      value: Number(windSpeedInput.value),
      unit: "knots",
    };
    const runwayDirection: ValueUnitPair<DirectionUnit> = {
      value: Number(runwayDirectionInput.value),
      unit: "degrees",
    };
    const windDirection: ValueUnitPair<DirectionUnit> = {
      value: Number(windDirectionInput.value),
      unit: "degrees",
    };

    const xwind = calculateCrosswindWithUnits(
      windSpeed,
      runwayDirection,
      windDirection,
    );

    // const windSpeed = Number(windSpeedInput.value);
    // const runwayDirection = Number(runwayDirectionInput.value);
    // const windDirection = Number(windDirectionInput.value);

    // const windSpeedInMPS = convertToMetersPerSecond(windSpeed, "knots");
    // const runwayDirectionInRadians = convertToRadians(runwayDirection);
    // const windDirectionInRadians = convertToRadians(windDirection);

    // const crosswindComponentInMPS = calculateCrosswind(
    //   windSpeedInMPS,
    //   windDirectionInRadians,
    //   runwayDirectionInRadians,
    // );

    // const crosswindComponent = convertSpeed(
    //   crosswindComponentInMPS,
    //   "m/s",
    //   "knots",
    // );

    const crosswindComponent = convertSpeed(xwind.value, xwind.unit, "knots");

    setCrosswind(crosswindComponent);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-medium">Crosswind Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCalculate} className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="windSpeed">Wind Speed</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Wind speed (knots)"
                  type="number"
                  id="windSpeed"
                  name="windSpeed"
                />
                <Select name="windSpeedUnits" defaultValue="knots">
                  <SelectTrigger id="windSpeedUnits" className="w-[180px]">
                    <SelectValue placeholder="Units" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="knots">Knots</SelectItem>
                    <SelectItem value="mph">MPH</SelectItem>
                    <SelectItem value="mps">MPS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="hidden text-sm text-red-600">Error</p>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="runwayDirection">Runway Direction</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Runway direction (degrees)"
                  type="number"
                  name="runwayDirection"
                  id="runwayDirection"
                />
                <Select name="runwayDirectionUnits" defaultValue="degrees">
                  <SelectTrigger
                    id="runwayDirectionUnits"
                    className="w-[180px]"
                  >
                    <SelectValue placeholder="Units" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="degrees">Degrees</SelectItem>
                    <SelectItem value="radians">Radians</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="windDirection">Wind Direction</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Wind direction (degrees)"
                  type="number"
                  name="windDirection"
                  id="windDirection"
                />
                <Select name="windDirectionUnits" defaultValue="degrees">
                  <SelectTrigger id="windDirectionUnits" className="w-[180px]">
                    <SelectValue placeholder="Units" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="degrees">Degrees</SelectItem>
                    <SelectItem value="radians">Radians</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" variant="default">
              Calculate
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-lg font-semibold">
            Crosswind Component:{" "}
            <span className="text-blue-500 dark:text-blue-300">
              {crosswind ? crosswind : "N/A"}
            </span>
          </p>
        </CardFooter>
      </Card>
      <Card className="mt-8">
        <CardContent>
          <article className="prose dark:prose-dark max-w-none text-center">
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

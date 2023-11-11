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
import {
  convertSpeed,
  isDirectionUnit,
  isSpeedUnit,
} from "~/utils/unitConversions";

function isValidInput(value: any) {
  if (!value || typeof value !== "string") {
    return false;
  }
  return true;
}

type ErrorsObject = {
  formErrors: string[];
  fieldErrors: {
    [key: string]: string[];
  };
};

export default function Crosswind() {
  const [crosswind, setCrosswind] = useState<number>();
  const [errors, setErrors] = useState<ErrorsObject>();

  const errorsObject = {
    formErrors: [],
    fieldErrors: {
      windSpeed: Array<string>(),
      runwayDirection: Array<string>(),
      windDirection: Array<string>(),
      windSpeedUnits: Array<string>(),
      runwayDirectionUnits: Array<string>(),
      windDirectionUnits: Array<string>(),
    },
  };

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

    if (!isValidInput(windSpeedInput.value)) {
      errorsObject.fieldErrors.windSpeed.push("Wind Speed required");
    }
    if (isNaN(Number(windSpeedInput.value))) {
      errorsObject.fieldErrors.windSpeed.push("Wind Speed must be a number");
    }
    if (!isValidInput(runwayDirectionInput.value)) {
      errorsObject.fieldErrors.runwayDirection.push(
        "Runway Direction required",
      );
    }
    if (isNaN(Number(runwayDirectionInput.value))) {
      errorsObject.fieldErrors.runwayDirection.push(
        "Runway Direction must be a number",
      );
    }
    if (!isValidInput(windDirectionInput.value)) {
      errorsObject.fieldErrors.windDirection.push("Wind Direction required");
    }
    if (isNaN(Number(windDirectionInput.value))) {
      errorsObject.fieldErrors.windDirection.push(
        "Wind Direction must be a number",
      );
    }
    if (!isValidInput(windSpeedUnits.value)) {
      errorsObject.fieldErrors.windSpeedUnits.push("Wind Speed Units required");
    }
    if (!isSpeedUnit(windSpeedUnits.value)) {
      errorsObject.fieldErrors.windSpeedUnits.push(
        "Wind Speed Units must be a valid unit",
      );
    }

    if (!isValidInput(runwayDirectionUnits.value)) {
      errorsObject.fieldErrors.runwayDirectionUnits.push(
        "Runway Direction Units required",
      );
    }
    if (!isDirectionUnit(runwayDirectionUnits.value)) {
      errorsObject.fieldErrors.runwayDirectionUnits.push(
        "Runway Direction Units must be a valid unit",
      );
    }
    if (!isValidInput(windDirectionUnits.value)) {
      errorsObject.fieldErrors.windDirectionUnits.push(
        "Wind Direction Units required",
      );
    }
    if (!isDirectionUnit(windDirectionUnits.value)) {
      errorsObject.fieldErrors.windDirectionUnits.push(
        "Wind Direction Units must be a valid unit",
      );
    }

    const hasErrors =
      errorsObject.formErrors.length ||
      Object.values(errorsObject.fieldErrors).some(
        (fieldErrors) => fieldErrors.length,
      );
    if (hasErrors) {
      setErrors(errorsObject);
      setCrosswind(undefined);
      return;
    } else {
      setErrors(undefined);
    }

    const windSpeed: ValueUnitPair<SpeedUnit> = {
      value: Number(windSpeedInput.value),
      unit: windSpeedUnits.value as SpeedUnit,
    };
    const runwayDirection: ValueUnitPair<DirectionUnit> = {
      value: Number(runwayDirectionInput.value),
      unit: runwayDirectionUnits.value as DirectionUnit,
    };
    const windDirection: ValueUnitPair<DirectionUnit> = {
      value: Number(windDirectionInput.value),
      unit: windDirectionUnits.value as DirectionUnit,
    };

    const xwind = calculateCrosswindWithUnits(
      windSpeed,
      runwayDirection,
      windDirection,
    );

    const crosswindComponent = convertSpeed(xwind.value, xwind.unit, "knots");

    setCrosswind(crosswindComponent);
  }

  function ErrorList({ errors }: { errors?: Array<string> | null }) {
    return errors?.length ? (
      <ul className="flex flex-col gap-1">
        {errors.map((error, i) => (
          <li key={i} className="text-[10px] text-red-500">
            {error}
          </li>
        ))}
      </ul>
    ) : null;
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
                  aria-invalid="true"
                />
                <Select name="windSpeedUnits" defaultValue="knots">
                  <SelectTrigger id="windSpeedUnits" className="w-[180px]">
                    <SelectValue placeholder="Units" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="knots">Knots</SelectItem>
                    <SelectItem value="mph">MPH</SelectItem>
                    <SelectItem value="m/s">m/s</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ErrorList errors={errors?.fieldErrors?.windSpeed} />
              <ErrorList errors={errors?.fieldErrors?.windSpeedUnits} />
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
              <ErrorList errors={errors?.fieldErrors?.runwayDirection} />
              <ErrorList errors={errors?.fieldErrors?.runwayDirectionUnits} />
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
              <ErrorList errors={errors?.fieldErrors?.windDirection} />
              <ErrorList errors={errors?.fieldErrors?.windDirectionUnits} />
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

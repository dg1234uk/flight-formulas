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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type {
  DirectionUnit,
  SpeedUnit,
  ValueUnitPair,
} from "~/utils/unitConversions";
import {
  DirectionUnits,
  SpeedUnits,
  convertSpeed,
  isDirectionUnit,
  isSpeedUnit,
} from "~/utils/unitConversions";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { H3, P } from "~/components/ui/prose";
import { calculateHeadwindWithUnits } from "~/utils/formulas/headwind";

const headwindFormSchema = z.object({
  windSpeed: z.number().min(0),
  windSpeedUnits: z.enum(SpeedUnits),
  runwayDirection: z.number().min(0).max(360),
  runwayDirectionUnits: z.enum(DirectionUnits),
  windDirection: z.number().min(0).max(360),
  windDirectionUnits: z.enum(DirectionUnits),
});

export default function Headwind() {
  const [headwind, setHeadwind] = useState<ValueUnitPair<SpeedUnit>>();
  const form = useForm<z.infer<typeof headwindFormSchema>>({
    resolver: zodResolver(headwindFormSchema),
    defaultValues: {
      windSpeed: 0,
      windSpeedUnits: "knots",
      runwayDirection: 0,
      runwayDirectionUnits: "degrees",
      windDirection: 0,
      windDirectionUnits: "degrees",
    },
  });

  function handleCalculate(values: z.infer<typeof headwindFormSchema>) {
    const {
      windSpeed,
      windSpeedUnits,
      runwayDirection,
      runwayDirectionUnits,
      windDirection,
      windDirectionUnits,
    } = values;

    if (
      isSpeedUnit(windSpeedUnits) &&
      isDirectionUnit(runwayDirectionUnits) &&
      isDirectionUnit(windDirectionUnits)
    ) {
      const windSpeedPair: ValueUnitPair<SpeedUnit> = {
        value: windSpeed,
        unit: windSpeedUnits,
      };

      const runwayDirectionPair: ValueUnitPair<DirectionUnit> = {
        value: Number(runwayDirection),
        unit: runwayDirectionUnits,
      };
      const windDirectionPair: ValueUnitPair<DirectionUnit> = {
        value: Number(windDirection),
        unit: windDirectionUnits,
      };

      const xwind = calculateHeadwindWithUnits(
        windSpeedPair,
        runwayDirectionPair,
        windDirectionPair,
      );

      const headwindUnits = windSpeedPair.unit;
      const headwindComponent = convertSpeed(
        xwind.value,
        xwind.unit,
        headwindUnits,
      );

      console.log(Math.round(headwindComponent));
      setHeadwind({
        value: headwindComponent,
        unit: headwindUnits,
      });
    } else {
      console.error("Invalid units");
    }
  }

  const headwindMathML = `
  <math display="block">
  <mrow>
    <mi>Headwind</mi>
    <mo>=</mo>
    <mi>Wind Speed</mi>
    <mo>×</mo>
    <mrow>
      <mi>cos</mi>
      <mo>⁡</mo>
    </mrow>
    <mrow>
      <mo fence="true">(</mo>
      <mi>Wind Direction</mi>
      <mo>−</mo>
      <mi>Runway Direction</mi>
      <mo fence="true">)</mo>
    </mrow>
  </mrow>
</math>
`;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-medium">Headwind Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCalculate)}
              className="mx-auto grid max-w-lg gap-4"
            >
              <div className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name="runwayDirection"
                  render={({ field }) => (
                    <FormItem className="grid flex-grow gap-1.5">
                      <FormLabel>Runway Direction</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Runway direction"
                          onChange={(e) => {
                            const value = e.target.value;
                            const numberValue =
                              value === "" ? undefined : Number(value);
                            field.onChange(numberValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="runwayDirectionUnits"
                  render={({ field }) => (
                    <FormItem className="grid w-[180px] gap-1.5">
                      <FormLabel>Runway Direction Units</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="runwayDirectionUnits">
                            <SelectValue placeholder="Units" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="degrees">Degrees</SelectItem>
                            <SelectItem value="radians">Radians</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name="windDirection"
                  render={({ field }) => (
                    <FormItem className="grid flex-grow gap-1.5">
                      <FormLabel>Wind Direction</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Runway direction"
                          onChange={(e) => {
                            const value = e.target.value;
                            const numberValue =
                              value === "" ? undefined : Number(value);
                            field.onChange(numberValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="windDirectionUnits"
                  render={({ field }) => (
                    <FormItem className="grid w-[180px] gap-1.5">
                      <FormLabel>Wind Direction Units</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="windDirectionUnits">
                            <SelectValue placeholder="Units" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="degrees">Degrees</SelectItem>
                            <SelectItem value="radians">Radians</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full gap-2">
                <FormField
                  control={form.control}
                  name="windSpeed"
                  render={({ field }) => (
                    <FormItem className="grid flex-grow gap-1.5">
                      <FormLabel>Wind Speed</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Wind speed"
                          onChange={(e) => {
                            const value = e.target.value;
                            const numberValue =
                              value === "" ? undefined : Number(value);
                            field.onChange(numberValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="windSpeedUnits"
                  render={({ field }) => (
                    <FormItem className="grid w-[180px] gap-1.5">
                      <FormLabel>Wind Speed Units</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="windSpeedUnits">
                            <SelectValue placeholder="Units" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="knots">Knots</SelectItem>
                            <SelectItem value="mph">MPH</SelectItem>
                            <SelectItem value="m/s">m/s</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" variant="default">
                Calculate
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-lg font-semibold">
            Headwind Component:{" "}
            <span className="text-blue-500 dark:text-blue-300">
              {headwind?.value?.toFixed(3) ?? "N/A"} {headwind?.unit ?? null}
            </span>
          </p>
        </CardFooter>
      </Card>
      <Card className="mt-8">
        <CardContent>
          <article className="max-w-none text-center">
            <H3 className="mt-8">How the Headwind Calculator Works</H3>
            <P>
              The calculation of headwind component invloves determining the
              wind's strength parallel to the aicraft's direction of travel or
              runway orientation.
            </P>
            <P>
              To calculate the headwind component, two key variables are used:
              wind speed and the angle difference between the aircraft's
              direction (or runway orientation) and the wind direction.
            </P>
            <P>
              <strong>Wind Speed</strong>: This is the speed at which the wind
              is blowing, typically measured in knots, miles per hour (mph), or
              meters per second (m/s).
            </P>
            <P>
              <strong>Angle Difference</strong>: This is the angle between the
              direction of the wind and the aircraft's direction of travel or
              the runway heading. It's measured in degrees or radians.
            </P>
            <P>
              <strong>Headwind Component</strong>: is calculated using the
              formula:
              <div
                className="mt-2"
                dangerouslySetInnerHTML={{ __html: headwindMathML }}
              />
            </P>
            <P>
              In this equation, the headwind component is determined by
              multiplying the wind speed by the cosine of the angle difference.
              The cosine function is used to calculate the portion of the wind
              speed that is acting parallel to the aircraft's direction. This
              effectively decomposes the wind speed into a component that
              directly influences the aircraft longitudinally.
            </P>
            <P>
              The resulting headwind component is expressed in the same units as
              the wind speed. For example, if the wind speed is in knots, the
              headwind component will also be measured in knots.
            </P>
          </article>
        </CardContent>
      </Card>
    </>
  );
}

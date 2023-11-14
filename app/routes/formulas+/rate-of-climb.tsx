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
import { calculateRateOfClimbWithUnits } from "~/utils/formulas/rateOfClimb";

const RateOfClimbFormSchema = z.object({
  tas: z.number().min(0),
  tasUnits: z.enum(SpeedUnits),
  fpa: z.number().min(-90).max(90),
  fpaUnits: z.enum(DirectionUnits),
});

export default function RateOfClimb() {
  const [roc, setRoc] = useState<ValueUnitPair<SpeedUnit>>();
  const form = useForm<z.infer<typeof RateOfClimbFormSchema>>({
    resolver: zodResolver(RateOfClimbFormSchema),
    defaultValues: {
      tas: 0,
      tasUnits: "knots",
      fpa: 0,
      fpaUnits: "degrees",
    },
  });

  function handleCalculate(values: z.infer<typeof RateOfClimbFormSchema>) {
    const tasUnitPair: ValueUnitPair<SpeedUnit> = {
      value: values.tas,
      unit: values.tasUnits,
    };
    const fpaUnitPair: ValueUnitPair<DirectionUnit> = {
      value: values.fpa,
      unit: values.fpaUnits,
    };

    const rocUnitPair = calculateRateOfClimbWithUnits(tasUnitPair, fpaUnitPair);

    const resultUnit = "fpm";
    const rocInFPM = convertSpeed(
      rocUnitPair.value,
      rocUnitPair.unit,
      resultUnit,
    );

    const convertedRocUnitPair: ValueUnitPair<SpeedUnit> = {
      value: rocInFPM,
      unit: resultUnit,
    };

    setRoc(convertedRocUnitPair);
  }

  const rateOfClimbMathML = `
  <math display="block">
    <mi>R</mi>
    <mi>O</mi>
    <mi>C</mi>
    <mo>=</mo>
    <mi>T</mi>
    <mi>A</mi>
    <mi>S</mi>
    <mo>×</mo>
    <mi>cos</mi>
    <mo fence="true">(</mo>
      <mi>F</mi>
      <mi>P</mi>
      <mi>A</mi>
    <mo fence="true">)</mo>
</math>
`;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-medium">
            Rate of Climb Calculator
          </CardTitle>
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
                  name="tas"
                  render={({ field }) => (
                    <FormItem className="grid flex-grow gap-1.5">
                      <FormLabel>True Airspeed (TAS)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="True Airspeed (TAS)"
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
                  name="tasUnits"
                  render={({ field }) => (
                    <FormItem className="grid w-[180px] gap-1.5">
                      <FormLabel>TAS Units</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="tasUnits">
                            <SelectValue placeholder="Units" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="knots">Knots</SelectItem>
                            <SelectItem value="mph">MPH</SelectItem>
                            <SelectItem value="m/s">m/s</SelectItem>
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
                  name="fpa"
                  render={({ field }) => (
                    <FormItem className="grid flex-grow gap-1.5">
                      <FormLabel>Flight Path Angle (FPA)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Flight Path Angle (FPA)"
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
                  name="fpaUnits"
                  render={({ field }) => (
                    <FormItem className="grid w-[180px] gap-1.5">
                      <FormLabel>FPA Units</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="fpaUnits">
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
              <Button type="submit" variant="default">
                Calculate
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-lg font-semibold">
            Rate of Climb:{" "}
            <span className="text-blue-500 dark:text-blue-300">
              {roc?.value?.toFixed(3) ?? "N/A"} {roc?.unit ?? null}
            </span>
          </p>
        </CardFooter>
      </Card>
      <Card className="mt-8">
        <CardContent>
          <article className="max-w-none text-center">
            <H3 className="mt-8">How the Rate of Climb Calculator Works</H3>
            <P>
              Calculating an aircraft's rate of climb involves two key
              variables: true airspeed (TAS) and flight path angle (FPA).
            </P>

            <P>
              <strong>True Airspeed (TAS)</strong> is the aircraft's speed
              relative to the air, usually measured in knots or meters per
              second.
            </P>

            <P>
              <strong>Flight Path Angle (FPA)</strong> is the angle between the
              horizon and the aircraft's path, typically expressed in radians or
              degrees.
            </P>

            <P>
              <strong>Rate of Climb (ROC)</strong> is calculated using the
              formula:
            </P>
            <div
              className="mt-2"
              dangerouslySetInnerHTML={{ __html: rateOfClimbMathML }}
            />

            <P>
              In this equation, the ROC is determined by multiplying TAS by the
              sine of FPA. The sine function derives the vertical component of
              the aircraft's velocity. As a result, without conversion, this
              formula gives the ROC in the same units as TAS (e.g. TAS in knots
              would give ROC in nautical miles per hour). Commonly rate of climb
              is expressed in either feet per minute (fpm) or meters per second
              (m/s).
            </P>
          </article>
        </CardContent>
      </Card>
    </>
  );
}

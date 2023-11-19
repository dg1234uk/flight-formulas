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
  AngleUnit,
  SpeedUnit,
  ValueUnitPair,
} from "~/utils/unitConversions";
import { AngleUnits, SpeedUnits, convertAngle } from "~/utils/unitConversions";
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
import { calculateTurnRateWithUnits } from "~/utils/formulas/turnRate";

const turnRateFormSchema = z.object({
  tas: z.number().min(0),
  tasUnits: z.enum(SpeedUnits),
  bankAngle: z.number().gt(-90).lt(90),
  bankAngleUnits: z.enum(AngleUnits),
});

export default function TurnRate() {
  const [turnRate, setTurnRate] = useState<ValueUnitPair<AngleUnit>>();
  const form = useForm<z.infer<typeof turnRateFormSchema>>({
    resolver: zodResolver(turnRateFormSchema),
    defaultValues: {
      tas: 0,
      tasUnits: "knots",
      bankAngle: 0,
      bankAngleUnits: "degrees",
    },
  });

  function handleCalculate(values: z.infer<typeof turnRateFormSchema>) {
    const tasUnitPair: ValueUnitPair<SpeedUnit> = {
      value: values.tas,
      unit: values.tasUnits,
    };
    const bankAngleUnitPair: ValueUnitPair<AngleUnit> = {
      value: values.bankAngle,
      unit: values.bankAngleUnits,
    };

    const rateUnitPair = calculateTurnRateWithUnits(
      tasUnitPair,
      bankAngleUnitPair,
    );

    const resultUnit = "degrees";
    const rateInDegrees = convertAngle(
      rateUnitPair.value,
      rateUnitPair.unit,
      resultUnit,
    );

    const convertedRateUnitPair: ValueUnitPair<AngleUnit> = {
      value: rateInDegrees,
      unit: resultUnit,
    };

    setTurnRate(convertedRateUnitPair);
  }

  const turnRateMathML = `
  <math display="block" xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>Turn Rate</mi>
  <mo>=</mo>
  <mfrac>
    <mrow>
      <mi>g</mi>
      <mo>&times;</mo>
      <mi>tan</mi>
      <mo fence="true">(</mo>
          <mi>Bank Angle</mi>
      <mo fence="true">)</mo>
    </mrow>
    <mrow>
      <mi>Airspeed</mi>
    </mrow>
  </mfrac>
</math>
`;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-medium">Turn Rate Calculator</CardTitle>
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
                  name="bankAngle"
                  render={({ field }) => (
                    <FormItem className="grid flex-grow gap-1.5">
                      <FormLabel>Bank Angle</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Bank Angle"
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
                  name="bankAngleUnits"
                  render={({ field }) => (
                    <FormItem className="grid w-[180px] gap-1.5">
                      <FormLabel>Bank Angle Units</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="bankAngleUnits">
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
            Turn Rate:{" "}
            <span className="text-blue-500 dark:text-blue-300">
              {turnRate?.value?.toFixed(3) ?? "N/A"} {turnRate?.unit ?? null}
            </span>
          </p>
        </CardFooter>
      </Card>
      <Card className="mt-8">
        <CardContent>
          <article className="max-w-none text-center">
            <H3 className="mt-8">How the Turn Rate Calculator Works</H3>
            <P>
              To accurately determine the Rate of Turn (ROT) for an aircraft,
              several key variables are essential. These include True Airspeed
              (TAS), Bank Angle (θ), and the constant for gravitational
              acceleration (g).
            </P>
            <P>
              <strong>True Airspeed (TAS)</strong>: is the aircraft's speed
              relative to the air, usually measured in knots or meters per
              second.
            </P>
            <P>
              <strong>Bank Angle(θ)</strong>: This is the angle at which the
              aircraft is tilted to its side for the turn. It's a crucial factor
              in determining the turn radius and is usually expressed in
              degrees.
            </P>
            <P>
              <strong>Gravitational Acceleration (g)</strong>: The constant
              acceleration due to gravity, approximately 9.81m/s^2 on the
              Earth’s surface, is also a factor in the calculation.
            </P>
            <P>The formula for turn radius</P>
            <div
              className="mt-2"
              dangerouslySetInnerHTML={{ __html: turnRateMathML }}
            />
            <P>
              The rate of turn is typically expressed in degrees per second or
              minutes per turn.
            </P>
          </article>
        </CardContent>
      </Card>
    </>
  );
}

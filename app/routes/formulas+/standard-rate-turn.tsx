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
import { SpeedUnits, convertAngle } from "~/utils/unitConversions";
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
import { calculateStandardRateBankAngleWithUnits } from "~/utils/formulas/standardRateTurn";

const standardRateTurnFormSchema = z.object({
  tas: z.number().min(0),
  tasUnits: z.enum(SpeedUnits),
});

export default function StandardRateTurn() {
  const [bankAngle, setBankAngle] = useState<ValueUnitPair<AngleUnit>>();
  const form = useForm<z.infer<typeof standardRateTurnFormSchema>>({
    resolver: zodResolver(standardRateTurnFormSchema),
    defaultValues: {
      tas: 0,
      tasUnits: "knots",
    },
  });

  function handleCalculate(values: z.infer<typeof standardRateTurnFormSchema>) {
    const tasUnitPair: ValueUnitPair<SpeedUnit> = {
      value: values.tas,
      unit: values.tasUnits,
    };

    const standardRateAOBRadians =
      calculateStandardRateBankAngleWithUnits(tasUnitPair);

    const AOBdegrees = convertAngle(
      standardRateAOBRadians,
      "radians",
      "degrees",
    );

    const bankAngleUnitPair: ValueUnitPair<AngleUnit> = {
      value: AOBdegrees,
      unit: "degrees",
    };

    setBankAngle(bankAngleUnitPair);
  }

  const standardRateBankAngleMathML = `
  <math display="block" xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>Bank Angle</mi>
  <mo>=</mo>
  <mrow>
    <mo>arctan</mo>
    <mrow>
      <mo>(</mo>
      <mfrac>
        <mrow>
          <mi>V</mi>
          <mo>&times;</mo>
          <mi>RateOfTurn</mi>
        </mrow>
        <mi>g</mi>
      </mfrac>
      <mo>)</mo>
    </mrow>
  </mrow>
</math>
`;

  const bankAngleMathML = `
  <math display="block" xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>θ</mi>
  <mo>=</mo>
  <mrow>
    <mo>arctan</mo>
    <mrow>
      <mo>(</mo>
      <mfrac>
        <mrow>
        <msup>
      <mi>V</mi>
      <mn>2</mn>
    </msup>
        </mrow>
        <mrow>
        <mi>r</mi>
        <mi>·</mi>
        <mi>g</mi>
      </mfrac>
      <mo>)</mo>
    </mrow>
  </mrow>
</math>
`;

  const turnRadiusMathML = `
  <math display="block" xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>r</mi>
  <mo>=</mo>
  <mrow>
      <mfrac>
        <mrow>
      <mi>V</mi>
        </mrow>
        <mrow>
        <mi>ω</mi>
        </mrow>
      </mfrac>
</math>
`;

  const turnRadiusSubIntoAOBMathML = `
  <math display="block" xmlns="http://www.w3.org/1998/Math/MathML">
<mi mathvariant="normal">θ</mi><mo>=</mo><mi>arctan</mi><mrow><mo>(</mo><mfrac><msup><mi>V</mi><mn>2</mn></msup><mrow><mfrac><mi>V</mi><mrow><mi>π</mi><mo>/</mo><mn>60</mn></mrow></mfrac><mo>·</mo><mi>g</mi></mrow></mfrac><mo>)</mo></mrow><mo>=</mo><mi>arctan</mi><mrow><mo>(</mo><mfrac><mrow><mi>V</mi><mo>·</mo><mi>π</mi><mo>/</mo><mn>60</mn></mrow><mi>g</mi></mfrac><mo>)</mo></mrow>
</math>
`;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-medium">
            Standard Rate Turn Bank Angle Calculator
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
              <Button type="submit" variant="default">
                Calculate
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-lg font-semibold">
            Standard Rate Turn Angle Of Bank:{" "}
            <span className="text-blue-500 dark:text-blue-300">
              {bankAngle?.value.toFixed(3) ?? "N/A"} {bankAngle?.unit ?? ""}{" "}
            </span>
          </p>
        </CardFooter>
      </Card>
      <Card className="mt-8">
        <CardContent>
          <article className="max-w-none text-center">
            <H3 className="mt-8">
              How the Standard Rate Turn Angle of Bank Calculator Works
            </H3>
            <P>
              The primary factor that influences the angle of bank required for
              a standard rate turn (3° / second), aka rate 1 turn, is the true
              airspeed of the aircraft. The formula for calculating the angle of
              bank is:
            </P>
            <P>
              The formula for the angle of bank required for a standard rate
              turn
            </P>
            <div
              className="mt-2"
              dangerouslySetInnerHTML={{ __html: standardRateBankAngleMathML }}
            />
            <P>
              To derive this formula, we start with the formula for calculating
              the angle of bank for a specific true airspeed, given a radius of
              turn.
            </P>
            <div
              className="mt-2"
              dangerouslySetInnerHTML={{ __html: bankAngleMathML }}
            />
            <P className="text-left">Where:</P>
            <ul className="list-disc pl-12 text-left">
              <li>
                <span
                  dangerouslySetInnerHTML={{
                    __html: `<math><mi>θ</mi></math>`,
                  }}
                />{" "}
                is the bank angle in radians
              </li>
              <li>
                <span
                  dangerouslySetInnerHTML={{
                    __html: `<math><mi>V</mi></math>`,
                  }}
                />{" "}
                is the true airspeed of the aircraft in meters per second (m/s)
              </li>
              <li>
                <span
                  dangerouslySetInnerHTML={{
                    __html: `<math><mi>r</mi></math>`,
                  }}
                />{" "}
                is the radius of the turn in meters
              </li>
              <li>
                <span
                  dangerouslySetInnerHTML={{
                    __html: `<math><mi>g</mi></math>`,
                  }}
                />{" "}
                is the acceleration due to gravity, approximately{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: `<math><mn>9.81</mn><msup><mi>m/s</mi><mn>2</mn></msup></math>`,
                  }}
                />{" "}
              </li>
            </ul>
            <P>The turn radius can be derived from the relationship:</P>
            <div
              className="mt-2"
              dangerouslySetInnerHTML={{ __html: turnRadiusMathML }}
            />
            <P>
              Where ω is the angular velocity of the turn (defined in radians),
              which for a standard rate turn (3° per second) is π / 60 radians
              per second.
            </P>
            <P>
              We can then substitute the expression for turn radius into the
              bank angle formula to get:
            </P>
            <div
              className="mt-2"
              dangerouslySetInnerHTML={{ __html: turnRadiusSubIntoAOBMathML }}
            />
          </article>
        </CardContent>
      </Card>
    </>
  );
}

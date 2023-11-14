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
import type { DirectionUnit, ValueUnitPair } from "~/utils/unitConversions";
import { DirectionUnits } from "~/utils/unitConversions";
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
import { calculateTurnLoadFactorWithUnits } from "~/utils/formulas/turnLoadFactor";

const turnLFFormSchema = z.object({
  bankAngle: z.number().gt(-90).lt(90),
  bankAngleUnits: z.enum(DirectionUnits),
});

export default function TurningLF() {
  const [loadFactor, setLoadFactor] = useState<number>();
  const form = useForm<z.infer<typeof turnLFFormSchema>>({
    resolver: zodResolver(turnLFFormSchema),
    defaultValues: {
      bankAngle: 0,
      bankAngleUnits: "degrees",
    },
  });

  function handleCalculate(values: z.infer<typeof turnLFFormSchema>) {
    const bankAngleUnitPair: ValueUnitPair<DirectionUnit> = {
      value: values.bankAngle,
      unit: values.bankAngleUnits,
    };

    const lf = calculateTurnLoadFactorWithUnits(bankAngleUnitPair);

    setLoadFactor(lf);
  }

  const turnLFMathML = `
  <math display="block" xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>Load Factor</mi>
  <mo>=</mo>
  <mfrac>
    <mn>1</mn>
    <mrow>
      <mi>cos</mi>
      <mo fence="true">(</mo>
        <mrow>
          <mi>Bank Angle</mi>
        </mrow>
        <mo fence="true">)</mo>
    </mrow>
  </mfrac>
</math>
`;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-medium">
            Turn Load Factor Calculator
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
            Turn Load Factor:{" "}
            <span className="text-blue-500 dark:text-blue-300">
              {loadFactor?.toFixed(3) ?? "N/A"}
            </span>
          </p>
        </CardFooter>
      </Card>
      <Card className="mt-8">
        <CardContent>
          <article className="max-w-none text-center">
            <H3 className="mt-8">How the Turn Load Factor Calculator Works</H3>
            <P>
              The primary factor that influences load factor (LF), also know as
              "g-force", in a level turn is the Bank Angle. The bank angle is
              the angle at which the aircraft is tilted to its side during a
              turn, typically expressed in degrees.
            </P>
            <P>
              <strong>Bank Angle(θ)</strong>: This is the angle at which the
              aircraft is tilted to its side for the turn.
            </P>
            <P>The formula for level turn load factor</P>
            <div
              className="mt-2"
              dangerouslySetInnerHTML={{ __html: turnLFMathML }}
            />
            <P>
              As the bank angle increase, the cosine of the angle decreases,
              leading to an increase in load factor. A bank angle of 0° (level
              flight) gives a load factor of 1, meaning no addditional load is
              applied. At steeper bank angles, the load factor significantly
              increases. A bank angle of 90° would result in an infinite load
              factor, which is not possible.
            </P>
          </article>
        </CardContent>
      </Card>
    </>
  );
}

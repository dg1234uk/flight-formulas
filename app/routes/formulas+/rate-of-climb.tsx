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
import type { SpeedUnit, ValueUnitPair } from "~/utils/unitConversions";
import { DirectionUnits, SpeedUnits } from "~/utils/unitConversions";
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
    console.log(values);
    const roc: ValueUnitPair<SpeedUnit> = {
      value: 0,
      unit: values.tasUnits,
    };
    setRoc(roc);
  }

  const rateOfClimbMathML = ``;

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
              className="grid gap-4"
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
            <P>TBC</P>
            <P>
              The formula used is:
              <div
                className="mt-2"
                dangerouslySetInnerHTML={{ __html: rateOfClimbMathML }}
              />
            </P>
          </article>
        </CardContent>
      </Card>
    </>
  );
}

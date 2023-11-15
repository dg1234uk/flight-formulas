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
import { H3, H4, P } from "~/components/ui/prose";
import { convertCoordStringToDecimalDegrees } from "~/utils/formulas/latlon";

const latLonFormSchema = z.object({
  latitude: z.string(),
  longitude: z.string(),
});

export default function LatLon() {
  const [latDd, setLatDd] = useState<number>();
  const [lonDd, setLonDd] = useState<number>();
  const form = useForm<z.infer<typeof latLonFormSchema>>({
    resolver: zodResolver(latLonFormSchema),
    defaultValues: {
      latitude: "",
      longitude: "",
    },
  });

  function handleCalculate(values: z.infer<typeof latLonFormSchema>) {
    const { latitude, longitude } = values;
    const latitudeDd = convertCoordStringToDecimalDegrees(latitude);
    const longitudeDd = convertCoordStringToDecimalDegrees(longitude);

    if (latitudeDd) {
      setLatDd(latitudeDd);
    } else {
      setLatDd(undefined);
    }
    if (longitudeDd) {
      setLonDd(longitudeDd);
    } else {
      setLonDd(undefined);
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-medium">
            Latitude and Longitude Converter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCalculate)}
              className="mx-auto grid max-w-lg gap-4"
            >
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem className="grid flex-grow gap-1.5">
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input placeholder="Latitude" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem className="grid flex-grow gap-1.5">
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input placeholder="Longitude" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant="default">
                Calculate
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="w-full text-center text-lg font-semibold">
            <p>
              Latitude:{" "}
              <span className="text-blue-500 dark:text-blue-300">
                {latDd ?? "N/A"}
              </span>{" "}
              Longitude:{" "}
              <span className="text-blue-500 dark:text-blue-300">
                {lonDd ?? "N/A"}
              </span>
            </p>
            <p className="text-blue-500 dark:text-blue-300">
              {latDd ?? null} {lonDd ?? null}
            </p>
          </div>
        </CardFooter>
      </Card>
      <Card className="mt-8">
        <CardContent>
          <article className="max-w-none text-center">
            <H3 className="mt-8">
              How the Latitude and Longitude Converter Works
            </H3>
            <P>
              Most digital systems will store latitude and longitude in Decimal
              Degrees (i.e. 53.3535). With a postive number representing North
              in latitude and East in longitude. A negative number is used to
              represent South in latitude and West in longitude
            </P>
            <H4 className="mt-4">Converting to Decimal Degrees (D.d)</H4>
            <P>
              DMS is often written as degrees(°), minutes ('), and seconds (").
              There are 60 minutes in a degree and 60 seconds in a minute.
              Therefore, there are 3600 seconds in a degree (60 x 60 = 3600). Be
              cautious of the latitude or longitude wrapping around 90° for
              latitude and 180° for longitude.
            </P>
            <P>For example 53° 51' 29.1234"</P>
            <P>
              <strong>Step 1</strong>: Identify the degrees, minutes, and
              seconds. For the above example, degrees = 53, minutes = 51,
              seconds = 29.1234
            </P>
            <P>
              <strong>Step 2</strong>: Convert the minutes to degrees: Divide
              the minutes by 60. (51' ÷ 60 = 0.85°)
            </P>
            <P>
              <strong>Step 3</strong>: Convert the seconds to degrees: Divide
              the seconds by 3600. (29.1234" ÷ 3600 = 0.00808983°)
            </P>
            <P>
              <strong>Step 4</strong>: Add these values to the degrees: 53° +
              0.85° + 0.00808983° = 53.85808983°
            </P>
            <P>
              If you are converting from degrees and minutes to decimal degrees,
              then you can skip step 3.
            </P>
          </article>
        </CardContent>
      </Card>
    </>
  );
}

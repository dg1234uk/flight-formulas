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
import { H3, P } from "~/components/ui/prose";
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

  const latLonMathML = `
  <math display="block" xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>Turn Radius</mi>
  <mo>=</mo>
  <mfrac>
    <msup>
      <mi>V</mi>
      <mn>2</mn>
    </msup>
    <mrow>
      <mi>g</mi>
      <mo>&#x22C5;</mo>
      <mi>tan</mi>
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
              {latDd ?? "N/A"} {lonDd ?? "N/A"}
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
            <P>Lat Lon all day long</P>
            <P>The formula for converting</P>
            <div
              className="mt-2"
              dangerouslySetInnerHTML={{ __html: latLonMathML }}
            />
          </article>
        </CardContent>
      </Card>
    </>
  );
}

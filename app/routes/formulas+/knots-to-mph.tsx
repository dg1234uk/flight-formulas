import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { knotsToMilesPerHour } from "~/utils/unitConversions";

export default function KnotsToMph() {
  const [mph, setMph] = useState<number | null>(null);
  function handleCalculate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // using react get the values from the input
    const knots = Number(event.currentTarget.elements.knots.value);
    // convert knots to mph
    const mph = knotsToMilesPerHour(knots);
    // set the state of mph
    setMph(mph);
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-medium">Knots to MPH Converter</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCalculate}>
            <Input
              className="mb-2"
              placeholder="(knots)"
              type="number"
              name="knots"
            />
            <Button type="submit" variant="default">
              Calculate
            </Button>
          </form>
          <p className="mt-4 text-lg font-semibold">
            Miles Per Hours:
            <span className="text-blue-500 dark:text-blue-300">
              {" "}
              {mph ? mph : "N/A"}
            </span>
          </p>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardContent>
          <article className="prose dark:prose-dark max-w-none">
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              How the Knots to MPH converter Works
            </h3>
          </article>
        </CardContent>
      </Card>
    </>
  );
}

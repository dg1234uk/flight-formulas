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
import { knotsToMilesPerHour } from "~/utils/unitConversions";

export default function KnotsToMph() {
  const [mph, setMph] = useState<number | null>(null);
  function handleCalculate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // using react get the values from the input
    const form = event.currentTarget;
    const knotsInput = form.elements.namedItem("knots") as HTMLInputElement;

    if (!knotsInput && typeof knotsInput !== "string") {
      // Handle the case where the input is not found
      console.error("Knots required");
      return;
    }

    const knots = Number(knotsInput.value);
    // convert knots to mph
    const mph = knotsToMilesPerHour(knots);
    // set the state of mph
    setMph(mph);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-medium">Knots to MPH Converter</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCalculate} className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="knots">Knots</Label>
              <Input
                className="mb-2"
                placeholder="(knots)"
                type="number"
                name="knots"
                id="knots"
              />
            </div>
            <Button type="submit" variant="default">
              Calculate
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-lg font-semibold">
            Miles Per Hours:
            <span className="text-blue-500 dark:text-blue-300">
              {" "}
              {mph ? mph : "N/A"}
            </span>
          </p>
        </CardFooter>
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

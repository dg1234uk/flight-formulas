import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { SpeedUnit, ValueUnitPair } from "~/utils/unitConversions";
import { SpeedLabels, convertSpeed } from "~/utils/unitConversions";
import { H3, P } from "~/components/ui/prose";
import { Label } from "~/components/ui/label";

type NullableValueUnitPair<Unit> = {
  [K in keyof ValueUnitPair<Unit>]: K extends "value"
    ? number | ""
    : ValueUnitPair<Unit>[K];
};

export default function SpeedConverter() {
  const [input1, setInput1] = useState<NullableValueUnitPair<SpeedUnit>>({
    value: 0,
    unit: "knots",
  });
  const [input2, setInput2] = useState<NullableValueUnitPair<SpeedUnit>>({
    value: 0,
    unit: "mph",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    isInput1: boolean,
  ) => {
    const inputValue = event.target.value;
    const newValue = inputValue === "" ? "" : Number(inputValue);
    const fromUnit = isInput1 ? input1.unit : input2.unit;
    const toUnit = isInput1 ? input2.unit : input1.unit;

    let convertedValue: number | "" = "";

    if (newValue !== "") {
      convertedValue = convertSpeed(newValue, fromUnit, toUnit);
    }

    if (isInput1) {
      setInput1({ value: newValue, unit: fromUnit });
      setInput2({ value: convertedValue, unit: toUnit });
    } else {
      setInput2({ value: newValue, unit: fromUnit });
      setInput1({ value: convertedValue, unit: toUnit });
    }
  };

  const handleUnitChange = (newUnit: SpeedUnit, isInput1: boolean) => {
    const fromPair = isInput1 ? input1 : input2;

    if (fromPair.value === "") {
      if (isInput1) {
        setInput1({ ...input1, unit: newUnit });
      } else {
        setInput2({ ...input2, unit: newUnit });
      }
    } else {
      const convertedValue = convertSpeed(
        fromPair.value,
        fromPair.unit,
        newUnit,
      );
      if (isInput1) {
        setInput1({ value: convertedValue, unit: newUnit });
      } else {
        setInput2({ value: convertedValue, unit: newUnit });
      }
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-medium">Speed Converter</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="mx-auto grid max-w-lg gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label>Speed</Label>
                <Input
                  name="input1"
                  id="input1"
                  type="number"
                  placeholder="Speed"
                  value={input1.value}
                  onChange={(e) => handleInputChange(e, true)}
                />
                <Label className="sr-only">Input 1 Units</Label>
                <Select
                  name="input1Units"
                  onValueChange={(value) =>
                    handleUnitChange(value as SpeedUnit, true)
                  }
                  value={input1.unit}
                >
                  <SelectTrigger id="speed1Units">
                    <SelectValue placeholder="Units" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SpeedLabels).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Speed</Label>
                <Input
                  name="input2"
                  id="input2"
                  type="number"
                  value={input2.value}
                  placeholder="Speed"
                  onChange={(e) => handleInputChange(e, false)}
                />
                <Label className="sr-only">Input 2 Units</Label>
                <Select
                  onValueChange={(value) =>
                    handleUnitChange(value as SpeedUnit, false)
                  }
                  value={input2.unit}
                >
                  <SelectTrigger id="speed2Units">
                    <SelectValue placeholder="Units" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SpeedLabels).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card className="mt-8">
        <CardContent>
          <article className="max-w-none text-center">
            <H3 className="mt-8">How the Speed Converter Works</H3>
            <P>Conversion Factors:</P>
            <ul className="list-disc pl-8 text-left">
              <li>Knots to M/S: Multiply knots by 0.514</li>
              <li>M/S to Knots: Multiply m/s by 1.944</li>
              <li>Mph to M/S: Multiply mph by 0.447</li>
              <li>M/S to Mph: Multiply m/s by 2.237</li>
              <li>Km/h to M/S: Divide km/h by 3.6</li>
              <li>M/S to Km/h: Multiply m/s by 3.6</li>
              <li>Ft/s to M/S: Multiply ft/s by 0.305</li>
              <li>M/S to Ft/s: Multiply m/s by 3.281</li>
              <li>Ft/min to M/S: Divide ft/min by 196.85</li>
              <li>M/S to Ft/min: Multiply m/s by 196.85</li>
            </ul>
          </article>
        </CardContent>
      </Card>
    </>
  );
}

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
import { convertSpeed } from "~/utils/unitConversions";
import { H3, P } from "~/components/ui/prose";
import { Label } from "~/components/ui/label";

export default function SpeedConverter() {
  const [input1, setInput1] = useState<ValueUnitPair<SpeedUnit>>({
    value: 0,
    unit: "knots",
  });
  const [input2, setInput2] = useState<ValueUnitPair<SpeedUnit>>({
    value: 0,
    unit: "mph",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    isInput1: boolean,
  ) => {
    console.log(event.target.value);
    const newValue = Number(event.target.value);
    const fromUnit = isInput1 ? input1.unit : input2.unit;
    const toUnit = isInput1 ? input2.unit : input1.unit;

    const convertedValue = convertSpeed(newValue, fromUnit, toUnit);

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

    const convertedValue = convertSpeed(fromPair.value, fromPair.unit, newUnit);
    if (isInput1) {
      setInput1({ value: convertedValue, unit: newUnit });
    } else {
      setInput2({ value: convertedValue, unit: newUnit });
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
                    <SelectItem value="knots">Knots</SelectItem>
                    <SelectItem value="mph">MPH</SelectItem>
                    <SelectItem value="m/s">m/s</SelectItem>
                    <SelectItem value="kph">KPH</SelectItem>
                    <SelectItem value="fpm">feet per minute</SelectItem>
                    <SelectItem value="fps">feet per second</SelectItem>
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
                    <SelectItem value="knots">Knots</SelectItem>
                    <SelectItem value="mph">MPH</SelectItem>
                    <SelectItem value="m/s">m/s</SelectItem>
                    <SelectItem value="kph">KPH</SelectItem>
                    <SelectItem value="fpm">feet per minute</SelectItem>
                    <SelectItem value="fps">feet per second</SelectItem>
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
            <P>Need for speed</P>
          </article>
        </CardContent>
      </Card>
    </>
  );
}

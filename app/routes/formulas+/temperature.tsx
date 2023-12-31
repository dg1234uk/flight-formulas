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
import {
  convertTemperature,
  temperatureLabels,
  type TemperatureUnit,
  type ValueUnitPair,
} from "~/utils/unitConversions";
import { H3, P } from "~/components/ui/prose";
import { Label } from "~/components/ui/label";

type NullableValueUnitPair<Unit> = {
  [K in keyof ValueUnitPair<Unit>]: K extends "value"
    ? number | ""
    : ValueUnitPair<Unit>[K];
};

export default function TemperatureConverter() {
  const [input1, setInput1] = useState<NullableValueUnitPair<TemperatureUnit>>({
    value: "",
    unit: "celsius",
  });
  const [input2, setInput2] = useState<NullableValueUnitPair<TemperatureUnit>>({
    value: "",
    unit: "kelvin",
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
      convertedValue = convertTemperature(newValue, fromUnit, toUnit);
    }

    if (isInput1) {
      setInput1({ value: newValue, unit: fromUnit });
      setInput2({ value: convertedValue, unit: toUnit });
    } else {
      setInput2({ value: newValue, unit: fromUnit });
      setInput1({ value: convertedValue, unit: toUnit });
    }
  };

  const handleUnitChange = (newUnit: TemperatureUnit, isInput1: boolean) => {
    const fromPair = isInput1 ? input1 : input2;

    if (fromPair.value === "") {
      if (isInput1) {
        setInput1({ ...input1, unit: newUnit });
      } else {
        setInput2({ ...input2, unit: newUnit });
      }
    } else {
      const convertedValue = convertTemperature(
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
          <CardTitle className="font-medium">Length Converter</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="mx-auto grid max-w-lg gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label>Temperature</Label>
                <Input
                  name="input1"
                  id="input1"
                  type="number"
                  placeholder="Temperature"
                  value={input1.value}
                  onChange={(e) => handleInputChange(e, true)}
                />
                <Label className="sr-only">Input 1 Units</Label>
                <Select
                  name="input1Units"
                  onValueChange={(value) =>
                    handleUnitChange(value as TemperatureUnit, true)
                  }
                  value={input1.unit}
                >
                  <SelectTrigger id="input1Units">
                    <SelectValue placeholder="Units" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(temperatureLabels).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Temperature</Label>
                <Input
                  name="input2"
                  id="input2"
                  type="number"
                  value={input2.value}
                  placeholder="Temperature"
                  onChange={(e) => handleInputChange(e, false)}
                />
                <Label className="sr-only">Input 2 Units</Label>
                <Select
                  onValueChange={(value) =>
                    handleUnitChange(value as TemperatureUnit, false)
                  }
                  value={input2.unit}
                >
                  <SelectTrigger id="input2Units">
                    <SelectValue placeholder="Units" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(temperatureLabels).map(([key, value]) => (
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
            <H3 className="mt-8">How the Temperature Converter Works</H3>
            <P>Conversion Factors:</P>
            <ul className="list-disc pl-8 text-left">
              <li>℃ to Kelvin: Multiply ℃ by xxx</li>
            </ul>
          </article>
        </CardContent>
      </Card>
    </>
  );
}

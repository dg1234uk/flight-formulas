import type { MetaFunction } from "@remix-run/node";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { H2, P } from "~/components/ui/prose";

export const meta: MetaFunction = () => {
  return [
    { title: "Flight Formulas" },
    {
      name: "description",
      content: `Aviation calculators and unit converters.`,
    },
  ];
};

export default function Index() {
  return (
    <Card>
      <CardHeader className="text-center">
        <H2>Welcome</H2>
      </CardHeader>
      <CardContent>
        <article className="pt-4 text-center">
          <P>
            <strong>Welcome to Flight Formulas</strong>, my project focused on
            aviation calculations and conversions. From essential calculations
            like Crosswind and Heading components to advanced computations such
            as convergency calculations and geodetic transformations, the site
            is equipped to handle various aviation-related calculations and
            conversions.
          </P>
          <P>To get start select a tool from the menu.</P>
        </article>
      </CardContent>
    </Card>
  );
}

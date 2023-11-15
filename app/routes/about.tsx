import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { H2, P } from "~/components/ui/prose";

export default function About() {
  return (
    <Card>
      <CardHeader className="text-center">
        <H2>About</H2>
      </CardHeader>
      <CardContent>
        <article className="pt-4 text-center">
          <P>
            <strong>Welcome to Flight Formulas</strong>, my personal project
            focused on aviation calculations and conversions. I've designed each
            tool and feature with the needs of pilots, students, and aviation
            enthusiasts in mind.
          </P>
          <P>
            <strong>Discover a variety of tools and converters</strong> tailored
            for a wide range of aviation requirements. From fundamental
            calculations like Crosswind and Heading components to advanced
            computations such as convergency calculations and geodetic
            transformations, the site is equipped to handle various
            aviation-related calculations. Additionally, it offers specialized
            unit converters for speed, distance, temperature, pressure, and
            more.
          </P>
          <P>
            <strong>Insight and understanding</strong> are at the core of Flight
            Formulas. Every tool is paired with detailed explanations of the
            mathematics and principles involved. This approach ensures that
            users not only get precise results but also gain a deeper
            understanding of the concepts.
          </P>
          <P>
            <strong>Continuous improvement</strong> is key. While I strive to
            ensure accuracy and reliability in all tools, there is always room
            for improvement. Your feedback and suggestions are invaluable. If
            you encounter any discrepancies or have ideas for new tools, please
            open a issue on the site's{" "}
            <a
              className="underline"
              href="https://github.com/dg1234uk/flight-formulas"
            >
              GitHub repository
            </a>
            .
          </P>
          <P>
            <strong>Begin your journey with Flight Formulas.</strong> I
            encourage you to explore the site, utilise the tools, and deepen
            your understanding of aviation. To start select a tool from the
            menu.
          </P>
        </article>
        <CardFooter>
          <P className="mt-10">
            <strong>Dan</strong>
          </P>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

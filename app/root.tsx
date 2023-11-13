import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import fontStylesheetUrl from "./styles/mathfonts.css";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { GeneralErrorBoundary } from "./components/error-boundary";
import { buttonVariants } from "./components/ui/button";
// import pkg from "better-react-mathjax";
// const { MathJaxContext } = pkg;

export const meta: MetaFunction = () => {
  return [
    { title: "Flight Formulas" },
    {
      name: "description",
      content: `Aviation calulators and unit converters.`,
    },
  ];
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: fontStylesheetUrl },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ].filter(Boolean);
};

type Formula = {
  name: string;
  href: string;
};

const formulas: Formula[] = [
  {
    name: "Crosswind Calculator",
    href: "/formulas/crosswind",
  },
  {
    name: "Headwind Calculator",
    href: "/formulas/headwind",
  },
  {
    name: "Rate of Climb Calculator",
    href: "/formulas/roc",
  },
  {
    name: "Turn Radius Calculator",
    href: "/formulas/turn-radius",
  },
  {
    name: "Turn Rate Calculator",
    href: "/formulas/turn-rate",
  },
  {
    name: "Standard Rate Turn Calculator",
    href: "/formulas/standard-rate-turn",
  },
  {
    name: "Lat Long format converter",
    href: "/formulas/lat-lon-format",
  },
  {
    name: "Lift Equation Calculator",
    href: "/formulas/lift",
  },
  {
    name: "Speed Unit Converter",
    href: "/formulas/speed-converter",
  },
  {
    name: "Distance Unit Converter",
    href: "/formulas/distance-converter",
  },
  {
    name: "Angle Unit Converter",
    href: "/formulas/angle-converter",
  },
  {
    name: "Temperature Unit Converter",
    href: "/formulas/temperature-converter",
  },
  {
    name: "Pressure Unit Converter",
    href: "/formulas/pressure-converter",
  },
  {
    name: "Weight Unit Converter",
    href: "/formulas/weight-converter",
  },
  {
    name: "Volume Unit Converter",
    href: "/formulas/volume-converter",
  },
  {
    name: "Fuel Unit Converter",
    href: "/formulas/fuel-converter",
  },
  {
    name: "Density Altitude Calculator",
    href: "/formulas/density-altitude",
  },
  {
    name: "Pressure Altitude Calculator",
    href: "/formulas/pressure-altitude",
  },
  {
    name: "True Altitude Calculator",
    href: "/formulas/true-altitude",
  },
  {
    name: "True Airspeed Calculator",
    href: "/formulas/true-airspeed",
  },
  {
    name: "Mach Number Calculator",
    href: "/formulas/mach-number",
  },
  {
    name: "Wind Chill Calculator",
    href: "/formulas/wind-chill",
  },
  {
    name: "Dew Point Calculator",
    href: "/formulas/dew-point",
  },
  {
    name: "Humidity Calculator",
    href: "/formulas/relative-humidity",
  },
  {
    name: "Wind Component Calculator",
    href: "/formulas/wind-component",
  },
  {
    name: "Fuel Endurance Calculator",
    href: "/formulas/fuel-endurance",
  },
  {
    name: "Fuel Consumption Calculator",
    href: "/formulas/fuel-consumption",
  },
  {
    name: "Fuel Weight Calculator",
    href: "/formulas/fuel-weight",
  },
  {
    name: "Fuel Volume Calculator",
    href: "/formulas/fuel-volume",
  },
  {
    name: "Fuel Density Calculator",
    href: "/formulas/fuel-density",
  },
  {
    name: "Fuel Flow Calculator",
    href: "/formulas/fuel-flow",
  },
  {
    name: "Cloub base and freezing level calculator",
    href: "/formulas/cloud-base",
  },
  {
    name: "AquaPlanning Speed Calculator",
    href: "/formulas/hydroplane-speed",
    // Both rotating and non-rotating
  },
  {
    name: "Heading and Ground Speed Calculator",
    href: "/formulas/heading-and-ground-speed",
  },
  {
    name: "Compass Heading Calculator",
    href: "/formulas/compass-heading",
  },
  {
    name: "Leg Time Calculator",
    href: "/formulas/leg-time",
  },
  {
    name: "Fuel Required Calculator",
    href: "/formulas/fuel-required",
  },
  {
    name: "EASA Fuel Policy Calculator",
    href: "/formulas/easa-fuel-policy",
  },
  {
    name: "Required Rate of Climb Calculator",
    href: "/formulas/required-rate-of-climb",
  },
  {
    name: "Specific Range Calculator",
    href: "/formulas/specific-range",
  },
  {
    name: "Pivotal Altitude Calculator",
    href: "/formulas/pivotal-altitude",
  },
  {
    name: "Top of Descent Calculator",
    href: "/formulas/top-of-descent",
  },
  {
    name: "Glide Distance Calculator",
    href: "/formulas/glide-distance",
  },
  // Time calculator
  // Time converter
  // Time Zone converter
  // Sunrise/Sunset calculator
  // Moonrise/Moonset calculator
  // Moon Phase calculator
  // Standard Closing Angle calculator
  // Miles per minute calculator (Speed factor)
  // MDR
  // Rules of Thumb article
  // Point to Point article
  // Holding Pattern entry calculator
  // Approach Minimums calculator
  // VDP calculator
  // 8.33 kHz channel spacing calculator
  // Temperature Error Correction calculator
  // QFE, QNH, QNE, QFF calculator
  // PLOG
  // Corriolis Force calculator
  // Departure calculator
  // Convergency calculator
  // Track Error Angle calculator
  // Scale on a Mercator chart calculator
  // Scale calculator
  // Nautical Air Miles calculator
  // Natutical Ground Miles calculator
  // Gradient calculator (degrees, percent, ratio)
  // Frequency Bands
  // Wavelength calculator
  // Max Transmission Range calculator
  // Max unambiguous range calculator
  // Min Range calculator
  // Power, work, torque
  // Specific Fuel Consumption
  // EPR
  // Piston Compression ratio
  // Loads BEM - DOM - OM - ZFM - RM - TOM - LM
  // Point of Equal Time
  // Point of Safe Return
  // Meeting MOCA
  // Take off Alternate
  // Planning Minimums
  // Lift Equation
  // Stall speed
  // Drag, Lift, Thrust, Weight
  // Propeller Efficiency
  // Wing formulas, taper ratio, aspect ratio, sweep angle, etc
  // Mass and balance calculator
  // https://edwilliams.org/avform147.htm
];

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <header className="bg-white py-4 shadow-sm dark:bg-gray-800">
        <div className="container mx-auto flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Flight Formulas
          </h1>
          <nav className="flex space-x-4">
            <Link
              to="about"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            >
              About
            </Link>
          </nav>
        </div>
      </header>
      <section className="w-full py-6 md:py-12 lg:py-16">
        <div className="container grid grid-cols-1 items-start justify-center gap-4 px-4 md:grid-cols-3 md:px-6 lg:gap-10">
          <aside className="h-[80vh] space-y-2 overflow-auto rounded-lg bg-white p-4 text-center shadow-md dark:bg-zinc-800 md:col-span-1">
            <h3 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
              Formulas
            </h3>
            <ul className="space-y-2">
              {formulas.map((formula) => (
                <li key={formula.href}>
                  <NavLink
                    to={formula.href}
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? `${buttonVariants({
                            variant: "link",
                          })} bg-blue-200 dark:bg-blue-700`
                        : `${buttonVariants({
                            variant: "link",
                          })}`
                    }
                  >
                    {formula.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </aside>
          <main className="space-y-8 md:col-span-2">
            <Outlet />
          </main>
        </div>
      </section>
    </Document>
  );
}

export function ErrorBoundary() {
  return (
    <Document>
      <div className="flex-1">
        <GeneralErrorBoundary />
      </div>
    </Document>
  );
}

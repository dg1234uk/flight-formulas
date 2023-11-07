import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { GeneralErrorBoundary } from "./components/error-boundary";
import { buttonVariants } from "./components/ui/button";

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
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ].filter(Boolean);
};

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
        <div className="container grid grid-cols-1 items-start justify-center gap-4 px-4 text-center md:grid-cols-3 md:px-6 lg:gap-10">
          <aside className="h-[80vh] space-y-2 overflow-auto rounded-lg bg-white p-4 shadow-md dark:bg-zinc-800 md:col-span-1">
            <h3 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl">
              Formulas
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="formulas/crosswind"
                  className={`${buttonVariants({
                    variant: "link",
                  })} bg-blue-200 dark:bg-blue-700`}
                >
                  Crosswind Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="here"
                  className={`${buttonVariants({
                    variant: "link",
                  })}`}
                >
                  Knots to MPH Converter
                </Link>
              </li>
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

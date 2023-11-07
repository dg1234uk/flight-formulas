import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Flight Formulas" },
    {
      name: "description",
      content: `Aviation calulators and unit converters.`,
    },
  ];
};

export default function Index() {
  return (
    <div>
      <h1 className="text-red-500">Hello World</h1>
    </div>
  );
}

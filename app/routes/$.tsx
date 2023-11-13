import { Link, useLocation } from "@remix-run/react";
import { GeneralErrorBoundary } from "~/components/error-boundary";

export function loader() {
  throw new Response("Not Found", { status: 404 });
}

export default function NotFoundRoute() {
  return <ErrorBoundary />;
}

export function ErrorBoundary() {
  const location = useLocation();
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => (
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl font-semibold">Not Found</h1>
            <p className="text-lg font-medium">We can't find this page:</p>
            <pre className="whitespace-pre-wrap break-all">
              {location.pathname}
            </pre>
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Go back home
            </Link>
          </div>
        ),
      }}
    />
  );
}

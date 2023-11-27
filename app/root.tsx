import ErrorPage from "~/components/util/ErrorPage";
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
  isRouteErrorResponse,
  useMatches,
  useRouteError,
} from "@remix-run/react";
import sharedStyles from "~/styles/shared.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [{ rel: "stylesheet", href: cssBundleHref }]
    : [{ rel: "stylesheet", href: sharedStyles }]),
  // ...
];

export const meta: MetaFunction = () => {
  return [
    { title: "Spendy" },
    {
      name: "description",
      content: "Welcome to Sepndy, track your expenses!",
    },
  ];
};

function Document({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const matches = useMatches();
  const disableJS = matches.some((match: any) => match.handle?.disableJS);

  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {!disableJS && <Scripts />}
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  /**
   *
   * TODO: Fix this, right now if we have a instanceof Response the statusText stays as "Error"
   */
  function getErrorText(): { message: string; statusText: string } {
    let errorContent = {
      message: "Something went wrong. Please try again later.",
      statusText: "Error",
    };
    if (isRouteErrorResponse(error)) {
      errorContent = {
        message: error.data.message || error.data,
        statusText: error.statusText,
      };
    } else if (error instanceof Error) {
      errorContent.message = error.message;
    } else if (error instanceof Response) {
      errorContent.statusText = error.statusText;
    }
    return errorContent;
  }

  const errorContent = getErrorText();

  return (
    <Document title={errorContent.statusText}>
      <main>
        <ErrorPage title={errorContent.statusText}>
          <p>{errorContent.message}</p>
          <p>
            Back to <Link to="/">safety</Link>
          </p>
        </ErrorPage>
      </main>
    </Document>
  );
}

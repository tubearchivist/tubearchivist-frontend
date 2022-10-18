import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Layout } from "./components/Layout";
import styles from "./styles/dark.css";
import global from "./styles/globals.css";

export const links: LinksFunction = () => {
  return [
    // { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: global },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Tubearchivist",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return {
    ENV: {
      API_URL: process.env.API_URL,
    },
  };
}

export default function App() {
  const data = useLoaderData();
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Layout>
          <Outlet />
        </Layout>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

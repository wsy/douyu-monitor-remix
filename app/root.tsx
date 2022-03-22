import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import { useEffect } from "react";
import { redirectUrl } from "./utils";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "DouyuEX弹幕助手",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  useEffect(() => {
    redirectUrl(window.location.href);
  }, [])
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

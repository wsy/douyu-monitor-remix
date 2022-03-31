import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import { useEffect } from "react";
import { redirectUrl } from "./utils";

export default function App() {
  useEffect(() => {
    redirectUrl(window.location.href);
  }, [])
  return (
    <html lang="zh">
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

export function ErrorBoundary() {
  return (
    <html>
      <head>
        <title>错误</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>页面发生错误</h1>
        <Scripts />
      </body>
    </html>
  );
}
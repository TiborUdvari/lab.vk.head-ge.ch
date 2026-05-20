#!/usr/bin/env node
// Wrapper around notebook-kit's `notebooks preview` that exposes the dev server
// on all interfaces (0.0.0.0) instead of localhost-only. The CLI doesn't have a
// --host flag, so we re-create the server ourselves using the same internals.
import { createServer } from "vite";
import { config, observable } from "@observablehq/notebook-kit/vite";

const server = await createServer({
  ...config(),
  plugins: [observable({})],
  root: ".",
  base: "/",
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true
  }
});

await server.listen();
server.printUrls();
server.bindCLIShortcuts({ print: true });

import { defineConfig } from "tsup";

export default defineConfig({
  // Transpile file-by-file instead of bundling ("preserve modules"): the
  // published package mirrors src/, index.js only re-exports, and with
  // "sideEffects": false a consumer bundler drops every module it doesn't
  // import — pulling one component no longer pays for the whole library.
  entry: ["src/**/*.ts", "src/**/*.tsx", "!src/**/*.stories.tsx"],
  format: ["esm", "cjs"],
  bundle: false,
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  // Every module in this package is a client component. esbuild strips
  // "use client" directives, so they are re-added per file after the build —
  // without this the published package breaks in Next.js App Router server
  // components. The script also gives ESM-strict runtimes real extensions
  // on relative imports.
  onSuccess: "node scripts/add-use-client.mjs",
});

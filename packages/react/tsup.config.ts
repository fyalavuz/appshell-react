import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/motion-framer.tsx"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "framer-motion"],
  treeshake: true,
  minify: true,
  // Every module in this package is a client component. esbuild and the
  // treeshake (rollup) pass both strip "use client" directives, so they are
  // re-added per chunk after the build — without this the published package
  // breaks in Next.js App Router server components.
  onSuccess: "node scripts/add-use-client.mjs",
});

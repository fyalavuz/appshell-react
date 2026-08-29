// Prepend the "use client" directive to every built JS chunk.
// tsup's treeshake (rollup) pass drops banner directives, and without them
// the published package breaks inside Next.js App Router server components.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dist = new URL("../dist", import.meta.url).pathname;
const DIRECTIVE = '"use client";';

let patched = 0;
for (const file of readdirSync(dist)) {
  if (!/\.(js|cjs)$/.test(file)) continue;
  const path = join(dist, file);
  const source = readFileSync(path, "utf8");
  if (source.startsWith(DIRECTIVE) || source.startsWith("'use client'")) continue;
  writeFileSync(path, `${DIRECTIVE}\n${source}`);
  patched++;
}
console.log(`[add-use-client] directive ensured on ${patched} chunk(s)`);

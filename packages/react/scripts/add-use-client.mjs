// Post-build fixes for the unbundled ("preserve modules") dist:
// 1. Prepend the "use client" directive to every built JS module — esbuild
//    strips directives, and without them the published package breaks inside
//    Next.js App Router server components.
// 2. Give relative imports/exports real extensions (./cn → ./cn.js|.cjs) so
//    the ESM output also works in strict Node resolution, not just bundlers.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const dist = new URL("../dist", import.meta.url).pathname;
const DIRECTIVE = '"use client";';

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}

const addExtensions = (source, ext) =>
  source.replace(
    /(\bfrom\s*|\brequire\(\s*|\bimport\(\s*)(["'])(\.{1,2}\/[^"']+?)\2/g,
    (match, lead, quote, spec) =>
      /\.(js|cjs|mjs|json)$/.test(spec)
        ? match
        : `${lead}${quote}${spec}${ext}${quote}`
  );

let patched = 0;
for (const path of walk(dist)) {
  const match = /\.(js|cjs)$/.exec(path);
  if (!match) continue;
  const ext = `.${match[1]}`;
  let source = readFileSync(path, "utf8");
  source = addExtensions(source, ext);
  if (!source.startsWith(DIRECTIVE) && !source.startsWith("'use client'")) {
    source = `${DIRECTIVE}\n${source}`;
  }
  writeFileSync(path, source);
  patched++;
}
console.log(`[add-use-client] ${patched} module(s) patched`);

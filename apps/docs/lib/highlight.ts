import { codeToHtml } from "shiki";

/**
 * Server-side syntax highlighting via Shiki, resolved at build time.
 * Uses a dark theme; blocks always render on a dark panel in both modes.
 */
export async function highlight(code: string, lang = "tsx"): Promise<string> {
  return codeToHtml(code, {
    lang,
    theme: "vesper",
  });
}

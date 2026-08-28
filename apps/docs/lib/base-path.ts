/**
 * Base path for static asset / iframe URLs. Next's <Link> handles this
 * automatically, but raw iframe src attributes need the prefix on
 * GitHub Pages, where the site lives under /appshell-react.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}

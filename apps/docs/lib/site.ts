/** Public origin and base path of the deployed docs (GitHub Pages). */
export const siteOrigin = "https://fyalavuz.github.io";
export const siteUrl = `${siteOrigin}${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}`;

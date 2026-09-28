import type { MetadataRoute } from "next";
import { docsNavigation, getAllExamples } from "@/lib/registry";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(["/", "/examples", "/playground"]);
  for (const section of docsNavigation) {
    for (const item of section.items) paths.add(item.href);
  }
  for (const example of getAllExamples()) paths.add(`/examples/${example.slug}`);

  return [...paths].map((path) => ({
    url: `${siteUrl}${path === "/" ? "/" : `${path}/`}`,
  }));
}

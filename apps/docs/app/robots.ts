import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // The bare full-screen previews exist to be framed by the example pages.
    rules: { userAgent: "*", allow: "/", disallow: ["/examples/preview/", "/playground/preview/"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/destinations", "/stories", "/partners", "/contact"];
  return routes.map((route, index) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));
}

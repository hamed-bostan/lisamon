import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/site";
import { categories } from "../content/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/artist", ...categories.filter(category => category.kind === "gallery").map(category => category.href)].map(path => ({
    url: new URL(path, siteUrl).toString(),
  }));
}

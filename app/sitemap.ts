import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "", 
    "/blog",
    "/docs",
    "/items",
    "/realty",
    "/transport",
    "/business",
    "/items"
  ];

  const baseUrl = "https://local-rp-wiki.vercel.app";

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: page === "" ? 1 : 0.5,
  }));
}

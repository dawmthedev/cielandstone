import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/api/", "/projects/*/experience", "/projects/*/model"],
    },
    sitemap: "https://cielandstone.com/sitemap.xml",
  };
}

import type { MetadataRoute } from "next";

import { projects } from "@/lib/data/projects";
import { services } from "@/lib/data/services";
import { locations } from "@/lib/data/locations";
import { siteConfig } from "@/lib/site";

const baseUrl = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/process`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/feasibility`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((svc) => ({
    url: `${baseUrl}/services/${svc.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const serviceLocationRoutes: MetadataRoute.Sitemap = [];
  for (const svc of services) {
    for (const loc of locations) {
      serviceLocationRoutes.push({
        url: `${baseUrl}/services/${svc.slug}/${loc.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.75,
      });
    }
  }

  const projectRoutes: MetadataRoute.Sitemap = projects.flatMap((project) => [
    {
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ]);

  return [...staticRoutes, ...serviceRoutes, ...serviceLocationRoutes, ...projectRoutes];
}

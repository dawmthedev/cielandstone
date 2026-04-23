import type { MetadataRoute } from "next";

import { projects } from "@/lib/data/projects";

const baseUrl = "https://cielandstone.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/process", "/feasibility", "/contact"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/feasibility" ? 0.9 : 0.8,
  }));

  const projectRoutes = projects.flatMap((project) => [
    {
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/projects/${project.slug}/experience`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
  ]);

  return [...staticRoutes, ...projectRoutes];
}

import React from "react";

import type { Project } from "@/lib/data/projects";
import { ProjectCard } from "@/components/projects/project-card";

export function RelatedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-24">
      <div className="flex items-end justify-between gap-8">
        <div>
          <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Related</div>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            More work
          </h2>
        </div>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}

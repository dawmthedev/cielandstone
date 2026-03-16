import React from "react";

import { projects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/projects/project-card";

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-32">
      <header className="max-w-2xl">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Projects</div>
        <h1 className="mt-4 text-balance text-4xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-6xl">
          Projects shaped around clarity, comfort, and buildability.
        </h1>
        <p className="mt-6 text-pretty text-base leading-7 text-foreground/65 sm:text-lg">
          Residential and small-scale project work guided by design clarity, thoughtful planning, and a pre-construction
          process that keeps homeowners informed from early concepts through coordination.
        </p>
      </header>

      <section className="mt-14 grid gap-8 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} priority={i < 2} />
        ))}
      </section>
    </main>
  );
}

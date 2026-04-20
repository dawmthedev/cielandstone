import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import { BIMViewerShell } from "@/components/bim/bim-viewer-shell";
import { getProjectBySlug, projects } from "@/lib/data/projects";

export default function ProjectModelPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    <main className="pt-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Link
          href={`/projects/${project.slug}`}
          className="text-xs tracking-[0.22em] uppercase text-foreground/60 hover:text-foreground"
        >
          Back to Project
        </Link>
        <h1 className="mt-6 text-balance text-4xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-6xl">
          {project.title} — Model
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-foreground/65 sm:text-lg">
          Explore the project model in a dedicated view while keeping the main portfolio experience image-led and easy to browse.
        </p>
      </div>

      <BIMViewerShell
        posterSrc={project.coverImage}
        modelUrl={project.modelUrl}
        availableSystems={project.availableSystems}
        eager
      />

      <div className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="rounded-2xl border border-black/10 bg-muted p-8 text-sm leading-6 text-foreground/65 dark:border-white/10">
          System filtering is driven by mesh naming conventions such as architectural, structural, or plumbing. As the
          model pipeline matures, those groupings can be aligned even more tightly with your export setup.
        </div>
      </div>
    </main>
  );
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

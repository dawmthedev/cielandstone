import { notFound } from "next/navigation";
import React from "react";

import { getProjectBySlug, projects } from "@/lib/data/projects";
import { ProjectDetailHero } from "@/components/projects/project-detail-hero";
import { MediaRail } from "@/components/projects/media-rail";
import { RelatedProjects } from "@/components/projects/related-projects";
import Link from "next/link";
import { BIMViewerShell } from "@/components/bim/bim-viewer-shell";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <main>
      <ProjectDetailHero project={project} />

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Project Summary</div>
            <h1 className="mt-4 text-balance text-4xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 text-pretty text-base leading-7 text-foreground/65 sm:text-lg">
              {project.shortDescription}
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-2xl border border-black/10 bg-muted p-8 dark:border-white/10">
              <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Details</div>
              <dl className="mt-6 grid gap-4 text-sm">
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="text-foreground/60">Location</dt>
                  <dd className="text-foreground/80">{project.location}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="text-foreground/60">Size</dt>
                  <dd className="text-foreground/80">{project.size}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="text-foreground/60">Year</dt>
                  <dd className="text-foreground/80">{project.year}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="text-foreground/60">Type</dt>
                  <dd className="text-foreground/80">{project.constructionType}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="text-foreground/60">Energy</dt>
                  <dd className="text-foreground/80">{project.energyStrategy}</dd>
                </div>
              </dl>
              <div className="mt-8">
                <Link
                  href={`/projects/${project.slug}/model`}
                  className="text-xs tracking-[0.22em] uppercase text-foreground/60 hover:text-foreground"
                >
                  Open dedicated model view
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BIMViewerShell posterSrc={project.coverImage} modelUrl={project.modelUrl} availableSystems={project.availableSystems} />

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Narrative</div>
            <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              Calm, buildable, intentional.
            </h2>
            <p className="mt-6 text-pretty text-base leading-7 text-foreground/65 sm:text-lg">
              {project.longDescription}
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-2xl border border-black/10 bg-background p-8 dark:border-white/10">
              <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Systems</div>
              <div className="mt-5 text-sm leading-6 text-foreground/65">
                {project.availableSystems.join(" · ")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <MediaRail media={project.gallery} />

      <RelatedProjects projects={related} />
    </main>
  );
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import { BIMViewerShell } from "@/components/bim/bim-viewer-shell";
import { PortfolioMediaList } from "@/components/projects/portfolio-media-list";
import { ProjectDetailHero } from "@/components/projects/project-detail-hero";
import { RelatedProjects } from "@/components/projects/related-projects";
import { getProjectBySlug, projects } from "@/lib/data/projects";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <main>
      <ProjectDetailHero project={project} />

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Portfolio Story</div>
            <h1 className="mt-4 text-balance text-4xl leading-[1.02] tracking-[-0.04em] sm:text-6xl">
              {project.title}
            </h1>
            <p className="mt-6 text-pretty text-base leading-7 text-foreground/65 sm:text-lg">
              {project.shortDescription}
            </p>
            <p className="mt-6 max-w-3xl text-pretty text-base leading-7 text-foreground/70 sm:text-lg">
              {project.longDescription}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/projects/${project.slug}/experience`}
                className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background"
              >
                Enter Experience
              </Link>
              <Link
                href="/projects"
                className="inline-flex h-12 items-center justify-center rounded-full border border-black/12 px-6 text-sm font-medium text-foreground/85 dark:border-white/12"
              >
                Back to Portfolio
              </Link>
            </div>
          </div>

          <aside className="rounded-[32px] border border-black/10 bg-[var(--panel)] p-8 backdrop-blur dark:border-white/10">
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Project Details</div>
            <dl className="mt-6 grid gap-4 text-sm">
              <div className="flex items-baseline justify-between gap-6">
                <dt className="text-foreground/60">Location</dt>
                <dd className="text-right text-foreground/80">{project.location}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6">
                <dt className="text-foreground/60">Date</dt>
                <dd className="text-right text-foreground/80">{project.year}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6">
                <dt className="text-foreground/60">Size</dt>
                <dd className="text-right text-foreground/80">{project.size}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6">
                <dt className="text-foreground/60">Type</dt>
                <dd className="text-right text-foreground/80">{project.constructionType}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6">
                <dt className="text-foreground/60">Focus</dt>
                <dd className="text-right text-foreground/80">{project.energyStrategy}</dd>
              </div>
            </dl>
            <div className="mt-8 rounded-3xl border border-black/10 bg-background p-5 text-sm leading-6 text-foreground/68 dark:border-white/10">
              This page introduces the project with a story, date, and media stack before handing off to the immersive
              walkthrough.
            </div>
          </aside>
        </div>
      </section>

      <PortfolioMediaList project={project} experienceHref={`/projects/${project.slug}/experience`} />

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">3D Preview</div>
            <h2 className="mt-4 text-balance text-3xl leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              A lightweight three.js preview for the next stage of the workflow.
            </h2>
            <p className="mt-6 text-pretty text-base leading-7 text-foreground/65 sm:text-lg">
              This demo keeps the portfolio fast and image-led while leaving room for a richer GLB or GLTF walkthrough
              later.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[30px] border border-black/10 bg-[var(--panel)] p-6 backdrop-blur dark:border-white/10">
              <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Recommended Format</div>
              <p className="mt-4 text-sm leading-6 text-foreground/68">
                Use `GLB/GLTF` for interactive walkthroughs in `three.js`, `MP4` for cinematic story clips, and still
                renders for fast loading on mobile and desktop.
              </p>
              <Link
                href={`/projects/${project.slug}/experience`}
                className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background"
              >
                Enter Experience
              </Link>
            </div>
          </div>
        </div>

        <BIMViewerShell
          posterSrc={project.coverImage}
          modelUrl={project.modelUrl}
          availableSystems={project.availableSystems}
        />
      </section>

      <RelatedProjects projects={related} />
    </main>
  );
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

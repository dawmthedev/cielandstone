import Image from "next/image";
import Link from "next/link";
import React from "react";

import { projects, getFeaturedProjects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { PortfolioMediaList } from "@/components/projects/portfolio-media-list";

export default function ProjectsPage() {
  const featured = getFeaturedProjects();
  const spotlight = featured[0] ?? projects[0];

  if (!spotlight) return null;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-32">
      <header className="max-w-3xl">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Portfolio</div>
        <h1 className="mt-4 text-balance text-4xl leading-[1.02] tracking-[-0.04em] sm:text-6xl">
          Residential projects shaped around story, clarity, and luxury detail.
        </h1>
        <p className="mt-6 text-pretty text-base leading-7 text-foreground/65 sm:text-lg">
          A living portfolio of homes, additions, kitchens, suites, and outdoor rooms. Each project begins with the
          title, story, date, and a simple path into the immersive experience.
        </p>
      </header>

      <section className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="overflow-hidden rounded-[36px] border border-black/10 bg-[var(--panel)] backdrop-blur dark:border-white/10">
          <div className="relative aspect-[16/10]">
            <Image
              src={spotlight.coverImage}
              alt={spotlight.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/15 to-black/60" />
            <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/80 backdrop-blur">
              Featured
            </div>
          </div>
          <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <div className="text-xs tracking-[0.22em] uppercase text-foreground/50">{spotlight.location}</div>
              <h2 className="mt-3 text-3xl leading-[1.03] tracking-[-0.03em] sm:text-5xl">{spotlight.title}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-foreground/68 sm:text-base">
                {spotlight.longDescription}
              </p>
            </div>
            <Link
              href={`/projects/${spotlight.slug}/experience`}
              className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background"
            >
              Enter Experience
            </Link>
          </div>
        </div>

        <div className="space-y-4 rounded-[32px] border border-black/10 bg-[var(--panel)] p-6 backdrop-blur dark:border-white/10">
          <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Project Story</div>
          <p className="text-sm leading-6 text-foreground/68">
            Every portfolio entry starts with a readable story, a date, and a media stack that leads from the main
            render into plans, civil coordination, and motion.
          </p>
          <div className="grid gap-3 pt-2">
            {[
              `Story-driven intro for ${spotlight.title}`,
              `Date: ${spotlight.year}`,
              `Residential context: ${spotlight.category}`,
              "Built for desktop and mobile walkthroughs",
            ].map((line) => (
              <div key={line} className="rounded-2xl border border-black/10 bg-background px-4 py-3 text-sm text-foreground/70 dark:border-white/10">
                {line}
              </div>
            ))}
          </div>
          <Link
            href={`/projects/${spotlight.slug}`}
            className="inline-flex h-12 items-center justify-center rounded-full border border-black/12 px-6 text-sm font-medium text-foreground/85 dark:border-white/12"
          >
            Open Story Page
          </Link>
        </div>
      </section>

      <PortfolioMediaList project={spotlight} experienceHref={`/projects/${spotlight.slug}/experience`} />

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} priority={i < 2} />
        ))}
      </section>
    </main>
  );
}

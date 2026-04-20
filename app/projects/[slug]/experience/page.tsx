import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import { BIMViewerShell } from "@/components/bim/bim-viewer-shell";
import { getProjectBySlug, projects } from "@/lib/data/projects";

function ExperiencePanel({
  index,
  label,
  title,
  copy,
  src,
  video,
}: {
  index: number;
  label: string;
  title: string;
  copy: string;
  src: string;
  video?: boolean;
}) {
  return (
    <section className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto grid w-full max-w-6xl gap-0 lg:min-h-[100dvh] lg:grid-cols-12">
        <div className="relative aspect-[16/11] overflow-hidden bg-muted lg:sticky lg:top-0 lg:col-span-7 lg:h-[100dvh] lg:aspect-auto">
          <Image src={src} alt={title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/65" />
          <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/80 backdrop-blur">
            {label}
          </div>
          {video ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-18 w-18 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur">
                <span className="ml-1 text-2xl">▶</span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex items-center px-6 py-14 lg:col-span-5 lg:px-10 lg:py-24">
          <div className="max-w-xl">
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/50">0{index + 1}</div>
            <h2 className="mt-4 text-balance text-3xl leading-[1.05] tracking-[-0.03em] sm:text-5xl">{title}</h2>
            <p className="mt-5 text-sm leading-6 text-foreground/68 sm:text-base">{copy}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function ProjectExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  const chapters = [
    {
      label: "Main Render",
      title: "Arrival and first impression",
      copy: "This is the emotional read of the home. The main render should carry tone, material feel, and a clear sense of place.",
      src: project.coverImage,
    },
    {
      label: "Plans",
      title: "Layout and sequence",
      copy: "Plan sheets translate the design into circulation, room relationships, and usable daily life. This is the layer that keeps the project honest.",
      src: project.gallery[0] ?? project.coverImage,
    },
    {
      label: "Civil Plans",
      title: "Ground plane and buildability",
      copy: "Civil coordination keeps the site response grounded, from access and grading to outdoor rooms and how the house meets the land.",
      src: project.gallery[1] ?? project.gallery[0] ?? project.coverImage,
    },
    {
      label: "Video",
      title: "Motion and atmosphere",
      copy: "A cinematic clip or compressed render walkthrough can capture rhythm and atmosphere. This slot is ready for MP4 content when you add it.",
      src: project.gallery[2] ?? project.coverImage,
      video: true,
    },
  ];

  const modelSrc = project.modelUrl ?? "/media/sample-bim-model.glb";

  return (
    <main className="pb-24">
      <section className="mx-auto w-full max-w-6xl px-6 pt-32">
        <Link href={`/projects/${project.slug}`} className="text-xs tracking-[0.22em] uppercase text-foreground/60 hover:text-foreground">
          Back to Story
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-end">
          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Experience</div>
            <h1 className="mt-4 text-balance text-4xl leading-[1.02] tracking-[-0.04em] sm:text-6xl">
              Immersive walkthrough: {project.title}
            </h1>
            <p className="mt-6 max-w-3xl text-pretty text-base leading-7 text-foreground/65 sm:text-lg">
              {project.shortDescription}
            </p>
            <p className="mt-6 max-w-3xl text-pretty text-base leading-7 text-foreground/70 sm:text-lg">
              This demo is structured for mobile and desktop. For a real project, the best long-term walkthrough format
              is a compressed `GLB/GLTF` model for `three.js`, backed by `MP4` clips for cinema-style storytelling.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background"
              >
                Back to Portfolio
              </Link>
              <a
                href="#walkthrough"
                className="inline-flex h-12 items-center justify-center rounded-full border border-black/12 px-6 text-sm font-medium text-foreground/85 dark:border-white/12"
              >
                Start Walkthrough
              </a>
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
            </dl>
          </aside>
        </div>
      </section>

      <div id="walkthrough" className="mt-16">
        {chapters.map((chapter, index) => (
          <ExperiencePanel
            key={chapter.label}
            index={index}
            label={chapter.label}
            title={chapter.title}
            copy={chapter.copy}
            src={chapter.src}
            video={chapter.video}
          />
        ))}
      </div>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Three.js Demo</div>
            <h2 className="mt-4 text-balance text-3xl leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              A lightweight 3D shell for the immersive stage.
            </h2>
            <p className="mt-6 text-pretty text-base leading-7 text-foreground/65 sm:text-lg">
              The viewer below is the interactive foundation for a later Revit-to-Blender-to-web workflow. Swap in a
              compressed GLB or a sequence of scene assets when you want a fully rendered walkthrough.
            </p>
          </div>

          <div className="rounded-[30px] border border-black/10 bg-[var(--panel)] p-8 backdrop-blur dark:border-white/10">
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Best Format</div>
            <p className="mt-4 text-sm leading-6 text-foreground/68">
              Use `GLB/GLTF` for interactive exploration, `MP4` for cinematic narrative clips, and still images for the
              portfolio preview cards.
            </p>
          </div>
        </div>

        <BIMViewerShell
          posterSrc={project.coverImage}
          modelUrl={modelSrc}
          availableSystems={project.availableSystems}
          eager
        />
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="rounded-[32px] border border-black/10 bg-[var(--panel)] p-8 text-sm leading-6 text-foreground/68 backdrop-blur dark:border-white/10">
          The demo now supports the story-first portfolio intro, labeled media sequence, and a dedicated experience route
          so mobile and desktop users can move from overview to walkthrough cleanly.
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

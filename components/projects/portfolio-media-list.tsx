import Image from "next/image";
import Link from "next/link";
import React from "react";

import type { Project } from "@/lib/data/projects";

type MediaSlot = {
  eyebrow: string;
  title: string;
  note: string;
  src: string;
  kind: "image" | "video";
};

function slotImage(project: Project, index: number) {
  return project.gallery[index] ?? project.gallery[0] ?? project.coverImage;
}

export function PortfolioMediaList({
  project,
  experienceHref,
}: {
  project: Project;
  experienceHref?: string;
}) {
  const slots: MediaSlot[] = [
    {
      eyebrow: "01 Render",
      title: "Main Property Render",
      note: "The primary exterior or interior image that sets the tone for the project.",
      src: project.coverImage,
      kind: "image",
    },
    {
      eyebrow: "02 Plans",
      title: "Plan Set",
      note: "Layout, circulation, and room relationships, shown as a clean planning layer.",
      src: slotImage(project, 0),
      kind: "image",
    },
    {
      eyebrow: "03 Civil",
      title: "Civil Plans",
      note: "Site access, grading, and ground-plane coordination that keep the project buildable.",
      src: slotImage(project, 1),
      kind: "image",
    },
    {
      eyebrow: "04 Motion",
      title: "Video Walkthrough",
      note: "A future MP4 or animated walkthrough slot for cinematic storytelling and client review.",
      src: slotImage(project, 2),
      kind: "video",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Portfolio Sequence</div>
          <h2 className="mt-4 text-balance text-3xl leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            Main render, plans, civil, and motion. One project story, multiple layers.
          </h2>
        </div>

        {experienceHref ? (
          <Link
            href={experienceHref}
            className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background"
          >
            Enter Experience
          </Link>
        ) : null}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {slots.map((slot, index) => (
          <article
            key={slot.title}
            className="overflow-hidden rounded-[28px] border border-black/10 bg-[var(--panel)] backdrop-blur dark:border-white/10"
          >
            <div className="relative aspect-[16/11]">
              <Image
                src={slot.src}
                alt={`${project.title} ${slot.title}`}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/65" />
              <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/80 backdrop-blur">
                {slot.eyebrow}
              </div>
              {slot.kind === "video" ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur">
                    <span className="ml-1 text-xl">▶</span>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="space-y-3 p-5">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg leading-[1.05] tracking-[-0.02em]">{slot.title}</h3>
                <div className="text-[11px] tracking-[0.22em] uppercase text-foreground/50">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
              <p className="text-sm leading-6 text-foreground/68">{slot.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

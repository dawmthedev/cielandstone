import Link from "next/link";
import React from "react";

import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProjectsScroller } from "@/components/home/featured-projects-scroller";
import { getFeaturedProjects } from "@/lib/data/projects";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <main className="bg-background">
      <HeroSection />

      <section className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="max-w-xl">
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">What We Do</div>
            <h2 className="mt-4 text-balance text-4xl leading-[1.02] tracking-[-0.04em] sm:text-5xl">
              Residential design that feels tailored, calm, and built for real living.
            </h2>
            <p className="mt-6 text-pretty text-base leading-7 text-foreground/68 sm:text-lg">
              We organize design, drawings, visuals, and coordination into a single clear process so kitchens, baths,
              bedrooms, outdoor rooms, and additions feel intentional before construction pressure starts to build.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                title: "Kitchens + Great Rooms",
                body: "Thoughtful layouts, custom storage, and material direction that make daily routines feel elevated and easy.",
              },
              {
                title: "Bathrooms + Primary Suites",
                body: "Spa-like spaces with better flow, quieter detailing, and the kind of restraint that makes finishes feel expensive.",
              },
              {
                title: "Outdoor Living",
                body: "Patios, terraces, entries, and garden connections that extend the house into the landscape.",
              },
              {
                title: "Additions + Whole Home Refresh",
                body: "Sensitive transformations that respect the existing house while making the plan feel more open and luxurious.",
              },
            ].map((item, index) => (
              <article
                key={item.title}
                className="rounded-[28px] border border-black/10 bg-[var(--panel)] p-6 shadow-[0_24px_80px_rgba(43,27,17,0.08)] backdrop-blur dark:border-white/10"
              >
                <div className="text-xs tracking-[0.22em] uppercase text-foreground/48">0{index + 1}</div>
                <h3 className="mt-4 text-2xl leading-[1.08] tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-foreground/68">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="rounded-[36px] border border-black/10 bg-[#201814] px-6 py-10 text-white shadow-[0_30px_100px_rgba(30,19,14,0.35)] sm:px-10 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
            <div>
              <div className="text-xs tracking-[0.22em] uppercase text-white/58">Why Homeowners Hire Us</div>
              <h2 className="mt-4 max-w-xl text-balance text-4xl leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                The best homes feel effortless because every visible detail was considered early.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Kitchens planned for movement, light, and storage that disappears into the architecture.",
                "Baths and suites that read soft, quiet, and luxurious without feeling overdesigned.",
                "Outdoor rooms that connect the house to the site in a way that feels natural and lived in.",
                "A single team that keeps the design intent coherent from concept through construction.",
              ].map((point) => (
                <div key={point} className="rounded-3xl border border-white/10 bg-white/6 p-5">
                  <p className="text-sm leading-6 text-white/78">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="rounded-[30px] border border-black/10 bg-[var(--panel)] p-8 backdrop-blur dark:border-white/10">
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Process Snapshot</div>
            <h2 className="mt-4 text-balance text-3xl leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              From first conversation to buildable direction.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-foreground/68 sm:text-base">
              We shape the project in stages so you can evaluate scope, design direction, and technical reality without
              losing momentum.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              {
                title: "1. Discovery",
                body: "We learn what you want to change, what style of home you want to live in, and what constraints are already visible.",
              },
              {
                title: "2. Direction",
                body: "Layouts, references, and visuals turn broad ideas into a refined residential plan you can confidently react to.",
              },
              {
                title: "3. Coordination",
                body: "The important technical intersections are organized early so the next stage is calmer and more buildable.",
              },
              {
                title: "4. Build-Team Readiness",
                body: "Your project is better prepared for builder, consultant, and permit conversations when the core intent is already resolved.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-[26px] border border-black/10 bg-background p-6 dark:border-white/10">
                <h3 className="text-xl leading-[1.1] tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-foreground/68">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              stat: "Client-ready inquiries",
              body: "Every major call to action routes to info@cielandstone.com so leads have a single clear entry point.",
            },
            {
              stat: "Luxury residential focus",
              body: "The language and structure speak directly to homeowners planning kitchens, baths, suites, and outdoor living spaces.",
            },
            {
              stat: "Visual credibility",
              body: "Projects, process, and inquiry sections now work together as a complete studio presentation.",
            },
          ].map((item) => (
            <article key={item.stat} className="rounded-[28px] border border-black/10 bg-[var(--panel)] p-6 backdrop-blur dark:border-white/10">
              <h3 className="text-2xl leading-[1.05] tracking-[-0.03em]">{item.stat}</h3>
              <p className="mt-4 text-sm leading-6 text-foreground/68">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <FeaturedProjectsScroller projects={featured} />

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="rounded-[36px] border border-black/10 bg-[var(--panel)] px-6 py-10 backdrop-blur sm:px-10 sm:py-14 dark:border-white/10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-2xl">
              <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Start Here</div>
              <h2 className="mt-4 text-balance text-4xl leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                If you have a property, a renovation idea, or a room that no longer feels right, we can shape the next step.
              </h2>
              <p className="mt-5 text-pretty text-base leading-7 text-foreground/68">
                Send a note with your location, project type, timeline, and anything that already feels important.
                All inquiries go directly to our studio inbox.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background"
              >
                Submit Inquiry
              </Link>
              <a
                href="mailto:info@cielandstone.com"
                className="inline-flex h-12 items-center justify-center rounded-full border border-black/12 px-6 text-sm font-medium text-foreground/85 dark:border-white/12"
              >
                info@cielandstone.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

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
              Design guidance that helps homeowners make better decisions earlier.
            </h2>
            <p className="mt-6 text-pretty text-base leading-7 text-foreground/68 sm:text-lg">
              We organize design, drawings, visuals, and coordination into a single clear process so your project
              feels intentional before construction pressure starts to build.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                title: "Renovations + Additions",
                body: "Smart scope shaping, layout studies, and architectural direction for homeowners improving the way they live.",
              },
              {
                title: "New Home Planning",
                body: "Early-stage concept development, visualization, and pre-construction clarity for custom residential projects.",
              },
              {
                title: "3D Visualization",
                body: "Images and model-based tools that make scale, flow, and material direction easier to understand.",
              },
              {
                title: "Coordination Support",
                body: "A calm bridge between design intent, budget expectations, and the technical conversations that follow.",
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
                The website feels calm because the process behind it is disciplined.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Clarity around scope before expensive decisions stack up.",
                "Visual communication that makes feedback faster and more useful.",
                "Budget and constructability kept in the conversation from the start.",
                "A more polished client experience than piecing together multiple disconnected consultants.",
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
                body: "We learn what you want to change, what matters most, and what constraints are already visible.",
              },
              {
                title: "2. Direction",
                body: "Layouts, references, and visuals turn broad ideas into something you can evaluate with confidence.",
              },
              {
                title: "3. Coordination",
                body: "The important technical intersections are organized early so the next stage is calmer and clearer.",
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
              stat: "Residential focus",
              body: "The language and structure speak directly to homeowners instead of reading like a generic template.",
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
                If you have a property, a plan, or even just a rough instinct, we can help you shape the next step.
              </h2>
              <p className="mt-5 text-pretty text-base leading-7 text-foreground/68">
                Send a note with your location, project type, timeline, and anything that already feels important. All
                inquiries go directly to our studio inbox.
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

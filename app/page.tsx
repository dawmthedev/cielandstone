import Link from "next/link";
import type { Metadata } from "next";
import React from "react";

import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProjectsScroller } from "@/components/home/featured-projects-scroller";
import { getFeaturedProjects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ciel & Stone | Design-Build Studio",
  description:
    "A residential design-build and preconstruction studio for thoughtful homeowners planning high-end renovations, additions, and new homes.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ciel & Stone | Design-Build Studio",
    description:
      "Thoughtful design. Precise execution. A calm, design-first process for residential projects.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ciel & Stone | Design-Build Studio",
    description:
      "Thoughtful design. Precise execution. A calm, design-first process for residential projects.",
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

const offerings = [
  {
    title: "Design-Build",
    body: "A single, design-first partner for residential projects that need coherence from concept through construction.",
  },
  {
    title: "Consultation",
    body: "Focused conversations for homeowners who want clarity on direction, scope, budget, and next steps.",
  },
  {
    title: "Project Planning",
    body: "Preconstruction planning that turns broad ideas into a measured, buildable path forward.",
  },
];

const process = [
  {
    title: "Discovery",
    body: "We begin by understanding the property, the goals, and the constraints that shape the project.",
  },
  {
    title: "Planning",
    body: "Scope, priorities, and budget are organized before design decisions become expensive to change.",
  },
  {
    title: "Design",
    body: "Layouts, materials, and details are developed with restraint so the final result feels resolved.",
  },
  {
    title: "Build",
    body: "The project moves forward with clearer documentation, calmer coordination, and fewer surprises on site.",
  },
];

const trustPoints = [
  "Transparent conversations about scope, cost, and sequencing.",
  "Attention to detail that protects the intent of the design.",
  "Calm professionalism from first contact through construction.",
];

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <main className="bg-background">
      <HeroSection />

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="max-w-xl">
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Philosophy</div>
            <h2 className="mt-4 text-balance text-3xl leading-[1.02] tracking-[-0.04em] sm:text-5xl">
              Design comes first, because the best construction decisions are made before work begins.
            </h2>
            <p className="mt-5 text-pretty text-sm leading-6 text-foreground/68 sm:mt-6 sm:text-lg sm:leading-7">
              Ciel &amp; Stone is built for serious homeowners who want a thoughtful studio partner, not a marketplace
              of disconnected trades. We shape residential work with clarity, restraint, and a disciplined eye for
              what will matter once the project is on site.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Tailored Homes",
                body: "Spaces that feel measured, comfortable, and intentionally edited rather than overworked.",
              },
              {
                title: "Clear Scope",
                body: "A defined project path that helps reduce drift before drawings and estimates separate from reality.",
              },
              {
                title: "Quiet Luxury",
                body: "Materials, proportions, and details that feel expensive because they are resolved with care.",
              },
              {
                title: "Residential Focus",
                body: "Kitchens, baths, additions, whole-home updates, and new homes planned with the same discipline.",
              },
            ].map((item, index) => (
              <article
                key={item.title}
                className="rounded-[28px] border border-black/10 bg-[var(--panel)] p-6 shadow-[0_24px_80px_rgba(43,27,17,0.08)] backdrop-blur dark:border-white/10"
              >
                <div className="text-xs tracking-[0.22em] uppercase text-foreground/48">0{index + 1}</div>
                <h3 className="mt-4 text-xl leading-[1.08] tracking-[-0.03em] sm:text-2xl">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-foreground/68">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="rounded-[32px] border border-black/10 bg-[#201814] px-5 py-8 text-white shadow-[0_30px_100px_rgba(30,19,14,0.35)] sm:rounded-[36px] sm:px-10 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
            <div>
              <div className="text-xs tracking-[0.22em] uppercase text-white/58">Process</div>
              <h2 className="mt-4 max-w-xl text-balance text-3xl leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                A measured sequence that keeps the work calm and coherent.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {process.map((point) => (
                <div key={point.title} className="rounded-3xl border border-white/10 bg-white/6 p-4 sm:p-5">
                  <div className="text-sm tracking-[0.18em] uppercase text-white/60">{point.title}</div>
                  <p className="mt-3 text-sm leading-6 text-white/78">{point.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-[30px] border border-black/10 bg-[var(--panel)] p-6 backdrop-blur dark:border-white/10 sm:p-8">
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Preconstruction</div>
            <h2 className="mt-4 text-balance text-3xl leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              Planning protects the project before construction makes every decision costly.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-foreground/68 sm:text-base">
              Preconstruction is where scope becomes clear, budget becomes legible, and the project stops relying on
              guesswork. The goal is simple: identify the expensive mistakes early, then shape the work so the final
              result is more predictable, more refined, and easier to build well.
            </p>
          </div>

          <div className="grid gap-3">
            {[
              {
                title: "Cost clarity",
                body: "A realistic view of scope and investment helps guide design decisions before they harden into commitments.",
              },
              {
                title: "Avoiding mistakes",
                body: "Lighting, layout, finish transitions, and technical details are easier to resolve before they become site changes.",
              },
              {
                title: "Better sequencing",
                body: "Early planning gives the team a cleaner path through estimating, permitting, and construction readiness.",
              },
              {
                title: "Less friction",
                body: "When expectations are set early, the project feels more controlled and the client experience stays calmer.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-[26px] border border-black/10 bg-background p-5 dark:border-white/10 sm:p-6">
                <h3 className="text-lg leading-[1.1] tracking-[-0.03em] sm:text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-foreground/68">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          {offerings.map((item) => (
            <article key={item.title} className="rounded-[28px] border border-black/10 bg-[var(--panel)] p-5 backdrop-blur dark:border-white/10 sm:p-6">
              <h3 className="text-xl leading-[1.05] tracking-[-0.03em] sm:text-2xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-foreground/68">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="rounded-[32px] border border-black/10 bg-[#1a1512] px-5 py-8 text-white shadow-[0_30px_100px_rgba(30,19,14,0.24)] sm:rounded-[36px] sm:px-10 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <div>
              <div className="text-xs tracking-[0.22em] uppercase text-white/58">Trust</div>
              <h2 className="mt-4 max-w-xl text-balance text-3xl leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                The experience should feel steady, attentive, and easy to read.
              </h2>
            </div>
            <div className="grid gap-3 sm:gap-4">
              {trustPoints.map((point) => (
                <div key={point} className="rounded-3xl border border-white/10 bg-white/6 p-4 sm:p-5">
                  <p className="text-sm leading-6 text-white/78">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeaturedProjectsScroller projects={featured} />

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="rounded-[32px] border border-black/10 bg-[var(--panel)] px-5 py-8 backdrop-blur sm:rounded-[36px] sm:px-10 sm:py-14 dark:border-white/10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-2xl">
              <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Feasibility Read</div>
              <h2 className="mt-4 text-balance text-3xl leading-[1.02] tracking-[-0.04em] sm:text-5xl">
                A disciplined first step, before design spend accelerates.
              </h2>
              <p className="mt-5 text-pretty text-sm leading-6 text-foreground/68 sm:text-base sm:leading-7">
                Eight questions, one written read: scope bracket, investment range, preconstruction plan, and the
                risks we&apos;d flag on day one. For priority-fit projects we credit the fee against preconstruction
                when we engage.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/feasibility"
                className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background"
              >
                Begin your Feasibility Read
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-black/12 px-6 text-sm font-medium text-foreground/85 dark:border-white/12"
              >
                Or start a conversation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import React from "react";
import type { Metadata } from "next";

import { FeasibilityStudio } from "@/components/feasibility/feasibility-studio";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Feasibility Read",
  description:
    "A disciplined first look at your residential project — scope, investment, and sequencing from Ciel & Stone before design spend accelerates.",
  alternates: { canonical: "/feasibility" },
  openGraph: {
    title: "Feasibility Read | Ciel & Stone",
    description:
      "A disciplined first look at your residential project — scope, investment, and sequencing before design spend accelerates.",
    url: `${siteConfig.url}/feasibility`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Feasibility Read | Ciel & Stone",
    description:
      "A disciplined first look at your residential project — scope, investment, and sequencing before design spend accelerates.",
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
};

const marks = [
  {
    title: "For buyers and owners of $3M+ residences",
    body: "The read is calibrated for Pacific Palisades, Beverly Hills, Malibu, Brentwood, and the high-end Los Angeles market.",
  },
  {
    title: "For architects and interior designers",
    body: "A defensible framing to bring to your client before you commit to a builder, and a clean handoff to preconstruction.",
  },
  {
    title: "For projects that cannot afford a guess",
    body: "Most expensive mistakes in high-end residential happen before any concrete is poured. The read is built to surface them.",
  },
];

export default function FeasibilityPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
      <header className="max-w-3xl">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Feasibility Read</div>
        <h1 className="mt-4 text-balance text-4xl leading-[1.02] tracking-[-0.04em] sm:text-6xl">
          A disciplined read on the work, before anyone commits.
        </h1>
        <p className="mt-5 text-pretty text-sm leading-6 text-foreground/65 sm:mt-6 sm:text-lg sm:leading-7">
          Eight questions. One written read: scope bracket, investment range, preconstruction plan, critical-path
          calendar, and the risks we would flag on day one. We prepare it for every serious inquiry — and we tell you,
          in writing, what we would and wouldn&apos;t take on.
        </p>
      </header>

      <section className="mt-12 grid gap-6 md:mt-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8">
          <FeasibilityStudio />
        </div>

        <aside className="grid content-start gap-4 md:col-span-4">
          <div className="rounded-[28px] border border-black/10 bg-[var(--panel)] p-6 backdrop-blur dark:border-white/10 sm:p-7">
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">What the read contains</div>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-foreground/70">
              <li>Scope bracket — design, precon, construction</li>
              <li>Preconstruction plan — weeks, dependencies, decisions</li>
              <li>Critical-path calendar for your timeline</li>
              <li>Risk read — jurisdiction, entitlement, constructability</li>
              <li>Explicit go / refine / decline recommendation</li>
            </ul>
          </div>

          {marks.map((m) => (
            <div
              key={m.title}
              className="rounded-[24px] border border-black/10 bg-background/55 p-5 dark:border-white/10 dark:bg-white/5"
            >
              <div className="text-sm leading-[1.2] tracking-[-0.01em]">{m.title}</div>
              <p className="mt-3 text-sm leading-6 text-foreground/65">{m.body}</p>
            </div>
          ))}

          <div className="rounded-[24px] border border-black/10 bg-[#1a1512] p-5 text-white sm:p-6">
            <div className="text-xs tracking-[0.22em] uppercase text-white/60">Direct</div>
            <p className="mt-3 text-sm leading-6 text-white/78">
              Prefer a direct conversation? Email{" "}
              <a href="mailto:info@cielandstone.com" className="underline">
                info@cielandstone.com
              </a>{" "}
              — priority-fit inquiries receive a studio reply within 24 hours.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

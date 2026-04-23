import React from "react";
import type { Metadata } from "next";

import { DailyBrief } from "@/components/studio/daily-brief";

export const metadata: Metadata = {
  title: "Daily Brief",
  description: "Internal studio operating tool.",
  robots: { index: false, follow: false },
};

export default function StudioBriefPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
      <header className="max-w-3xl">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Studio · Internal</div>
        <h1 className="mt-4 text-balance text-3xl leading-[1.02] tracking-[-0.04em] sm:text-5xl">
          Daily Brief — the discipline, as a tool.
        </h1>
        <p className="mt-5 text-pretty text-sm leading-6 text-foreground/65 sm:text-base sm:leading-7">
          Six questions. One page out. Brand integrity, competitive scan, offer audit, monetization leaks, today&apos;s
          post, today&apos;s one action. Run it at 7am before anything else happens.
        </p>
      </header>

      <section className="mt-10 md:mt-14">
        <DailyBrief />
      </section>

      <p className="mt-10 text-xs leading-5 text-foreground/50">
        Internal route. Not indexed. Outputs are suggestions to act on, not a replacement for judgment.
      </p>
    </main>
  );
}

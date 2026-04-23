"use client";

import Link from "next/link";
import { useEffect } from "react";

import { ContactForm } from "@/components/contact/contact-form";
import { trackLandingView } from "@/lib/analytics";
import type { LandingContent } from "@/lib/data/landing-content";

/**
 * Shared landing page layout for /services/[service] and /services/[service]/[location].
 *
 * Priorities in order:
 * 1. Recognition in the hero — specific, outcome-led, location-aware.
 * 2. Anchor line with investment range, timeline, and location — no scroll needed.
 * 3. Value props that reduce risk specifically for this service.
 * 4. Location considerations (if applicable) — demonstrate jurisdictional fluency.
 * 5. Preconstruction focus — what we actually do before construction.
 * 6. What's included — the offer scope in plain language.
 * 7. Embedded lead form, pre-tagged with service + location.
 * 8. FAQ for objection handling + SEO.
 * 9. Final CTA to Feasibility Read.
 */

export function LandingPage({ content }: { content: LandingContent }) {
  const { service, location, investmentRange, heroHeadline, heroSub, anchorLine, locationFaq, locationConsiderations } = content;

  useEffect(() => {
    trackLandingView({ service: service.slug, location: location?.slug });
  }, [service.slug, location?.slug]);

  const combinedFaq = [...service.faq, ...locationFaq];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-36">
      {/* ───── HERO ───── */}
      <header className="max-w-4xl">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">
          {service.shortName}
          {location ? ` · ${location.displayName}` : ""}
        </div>
        <h1 className="mt-5 text-balance text-3xl leading-[1.02] tracking-[-0.04em] sm:text-6xl">
          {heroHeadline}
        </h1>
        <p className="mt-6 max-w-3xl text-pretty text-sm leading-6 text-foreground/70 sm:text-lg sm:leading-8">
          {heroSub}
        </p>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Link
            href="/feasibility"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent-strong)] px-6 text-sm font-medium text-[var(--accent-contrast)]"
          >
            Begin a Feasibility Read
          </Link>
          <a
            href="#inquiry"
            className="inline-flex h-12 items-center justify-center rounded-full border border-black/15 px-6 text-sm font-medium text-foreground/85 dark:border-white/15"
          >
            Or start a project brief
          </a>
        </div>
        <div className="mt-8 text-xs tracking-[0.12em] uppercase text-foreground/55 sm:text-sm">
          {anchorLine}
        </div>
      </header>

      {/* ───── VALUE PROPS ───── */}
      <section className="mt-20 sm:mt-28">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">
          Why homeowners choose us for {service.shortName.toLowerCase()}
        </div>
        <h2 className="mt-4 max-w-3xl text-balance text-2xl leading-[1.08] tracking-[-0.03em] sm:text-4xl">
          Planned before it&apos;s built. Built once, and built right.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {service.valueProps.map((v) => (
            <article
              key={v.title}
              className="rounded-[22px] border border-black/10 bg-background/55 p-6 dark:border-white/10 dark:bg-white/5"
            >
              <h3 className="text-lg tracking-[-0.01em]">{v.title}</h3>
              <p className="mt-3 text-sm leading-6 text-foreground/70">{v.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ───── LOCATION CONSIDERATIONS ───── */}
      {location && locationConsiderations.length > 0 ? (
        <section className="mt-20 sm:mt-28 rounded-[28px] border border-black/10 bg-[#1a1512] p-6 text-white sm:p-10">
          <div className="text-xs tracking-[0.22em] uppercase text-white/60">
            {location.name} context
          </div>
          <h2 className="mt-4 max-w-3xl text-balance text-2xl leading-[1.08] tracking-[-0.02em] sm:text-3xl">
            What we plan for on day one — specific to your market.
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {locationConsiderations.map((note, i) => (
              <li
                key={i}
                className="rounded-[18px] border border-white/10 bg-white/5 p-5 text-sm leading-6 text-white/80"
              >
                {note}
              </li>
            ))}
          </ul>
          <div className="mt-8 text-sm leading-6 text-white/70">
            {location.marketContext}
          </div>
        </section>
      ) : null}

      {/* ───── PRECONSTRUCTION FOCUS ───── */}
      <section className="mt-20 sm:mt-28">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Preconstruction</div>
        <h2 className="mt-4 max-w-3xl text-balance text-2xl leading-[1.08] tracking-[-0.03em] sm:text-4xl">
          The work that happens before anything gets built.
        </h2>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-foreground/70 sm:text-base">
          Preconstruction is where the expensive decisions get made — and where cost overruns almost always start.
          For {service.shortName.toLowerCase()} projects, we focus on:
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {service.preconFocus.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-[16px] border border-black/8 bg-background/40 px-5 py-4 text-sm leading-6 text-foreground/75 dark:border-white/10 dark:bg-white/5"
            >
              <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-strong)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ───── WHAT'S INCLUDED ───── */}
      <section className="mt-20 sm:mt-28 rounded-[28px] border border-black/10 bg-[var(--panel)] p-6 backdrop-blur dark:border-white/10 sm:p-10">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">What&apos;s included</div>
        <h2 className="mt-4 max-w-3xl text-balance text-2xl leading-[1.08] tracking-[-0.03em] sm:text-3xl">
          One contract, one team, end to end.
        </h2>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {service.whatsIncluded.map((item) => (
            <li
              key={item}
              className="rounded-[16px] border border-black/8 bg-background/55 px-5 py-4 text-sm leading-6 text-foreground/78 dark:border-white/10 dark:bg-white/5"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ───── INQUIRY FORM ───── */}
      <section id="inquiry" className="mt-20 sm:mt-28">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Project brief</div>
        <h2 className="mt-4 max-w-3xl text-balance text-2xl leading-[1.08] tracking-[-0.03em] sm:text-4xl">
          Tell us about the {service.shortName.toLowerCase()}
          {location ? ` and the ${location.name} property` : ""}.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-foreground/65 sm:text-base">
          The more you share, the more useful our first response will be. If the project moves forward, it begins with a Feasibility Read — a written scope, investment, and risk read before design spend accelerates.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <ContactForm
              defaultService={service.adName}
              defaultLocation={location?.name}
              submitLabel={`Submit brief · ${service.shortName}`}
            />
          </div>
          <aside className="grid gap-6 md:col-span-5">
            <div className="rounded-[22px] border border-black/10 bg-background/55 p-6 dark:border-white/10 sm:p-8">
              <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">
                Typical range
              </div>
              <div className="mt-3 text-2xl tracking-[-0.02em]">{investmentRange}</div>
              <div className="mt-2 text-sm text-foreground/60">{service.timelineRange}</div>
            </div>
            <div className="rounded-[22px] border border-black/10 bg-background/55 p-6 dark:border-white/10 sm:p-8">
              <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Prefer the read</div>
              <p className="mt-4 text-sm leading-6 text-foreground/70">
                For committed projects, the <Link href="/feasibility" className="underline decoration-foreground/30 underline-offset-4 hover:decoration-foreground">Feasibility Read</Link> is the fastest way to get a written scope, investment range, and risk flag before design spend begins.
              </p>
              <Link
                href="/feasibility"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-5 text-xs font-medium tracking-[0.12em] uppercase text-background"
              >
                Begin the Read
              </Link>
            </div>
            {location ? (
              <div className="rounded-[22px] border border-black/10 bg-background/55 p-6 dark:border-white/10 sm:p-8">
                <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">
                  {location.name} permit window
                </div>
                <div className="mt-3 text-xl tracking-[-0.02em]">{location.permitTimelineMonths}</div>
                <p className="mt-2 text-xs text-foreground/55">
                  Typical review period for a {service.shortName.toLowerCase()} scope. Refined per-project.
                </p>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="mt-20 sm:mt-28">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Frequently Asked</div>
        <h2 className="mt-4 max-w-3xl text-balance text-2xl leading-[1.08] tracking-[-0.03em] sm:text-4xl">
          What homeowners usually ask about {service.shortName.toLowerCase()}
          {location ? ` in ${location.name}` : ""}.
        </h2>
        <div className="mt-10 grid gap-3">
          {combinedFaq.map((item, i) => (
            <details
              key={i}
              className="group rounded-[18px] border border-black/10 bg-background/55 p-6 open:bg-background/80 dark:border-white/10 dark:bg-white/5 dark:open:bg-white/10"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <span className="text-base leading-6 text-foreground/90">{item.q}</span>
                <span className="mt-1 text-lg text-foreground/45 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-sm leading-6 text-foreground/70">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ───── FINAL CTA ───── */}
      <section className="mt-20 sm:mt-28 rounded-[28px] border border-black/10 bg-[#1a1512] p-8 text-white sm:p-12">
        <div className="text-xs tracking-[0.22em] uppercase text-white/55">Next step</div>
        <h2 className="mt-4 max-w-3xl text-balance text-2xl leading-[1.05] tracking-[-0.03em] sm:text-4xl">
          Start with the read. Then we&apos;ll know what to build.
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
          Eight questions, a written read within 5 business days, and a clear next step. For priority-fit projects, the fee is credited against preconstruction.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/feasibility"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-black"
          >
            Begin a Feasibility Read
          </Link>
          <a
            href="mailto:info@cielandstone.com"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-medium text-white/90"
          >
            Email the studio
          </a>
        </div>
      </section>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import React from "react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] items-end overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80"
        alt="Luxury residential home exterior in a scenic setting"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(214,161,117,0.28),transparent_28%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 pb-20 pt-36 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] lg:items-end">
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.24em] uppercase text-white/70">Residential Design + Pre-Construction</div>
          <h1 className="mt-6 text-balance text-5xl leading-[0.96] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl">
            Luxury homes start with clear decisions, calm planning, and a strong sense of place.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-white/82 sm:text-lg">
            Ciel &amp; Stone helps homeowners shape kitchens, bathrooms, bedrooms, outdoor living spaces, renovations,
            and new homes through thoughtful design, visualization, and pre-construction coordination.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent-strong)] px-6 text-sm font-medium text-[var(--accent-contrast)] shadow-[0_20px_50px_rgba(143,75,36,0.35)]"
            >
              Start Your Project
            </Link>
            <Link
              href="/projects"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              Explore Residences
            </Link>
            <a
              href="mailto:info@cielandstone.com"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/35 bg-white/0 px-6 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              Email Info@Cielandstone.com
            </a>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Project Types", value: "Kitchens, baths, suites, additions, new homes" },
              { label: "Support", value: "Design, visualization, coordination" },
              { label: "Inquiry Email", value: "info@cielandstone.com" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <div className="text-[11px] tracking-[0.22em] uppercase text-white/58">{item.label}</div>
                <div className="mt-2 text-sm leading-6 text-white/88">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/15 bg-white/10 p-6 text-white backdrop-blur-xl">
          <div className="text-xs tracking-[0.22em] uppercase text-white/65">What clients need most</div>
          <div className="mt-5 grid gap-4">
            {[
              "A realistic path before permit and contractor conversations start.",
              "Design language that feels elevated without becoming vague or expensive to execute.",
              "A single team that can explain the tradeoffs clearly and early.",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/10 p-4">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                <p className="text-sm leading-6 text-white/84">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

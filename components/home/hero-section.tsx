import Image from "next/image";
import Link from "next/link";
import React from "react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[92svh] items-end overflow-hidden md:min-h-[100dvh]">
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

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] lg:items-end">
        <div className="max-w-3xl">
          <div className="text-xs tracking-[0.24em] uppercase text-white/70">Design-Build + Preconstruction</div>
          <h1 className="mt-5 max-w-[12ch] text-balance text-4xl leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl">
            Thoughtful design. Precise execution.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-sm leading-6 text-white/82 sm:text-lg sm:leading-7">
            Ciel &amp; Stone is a residential design-build and preconstruction studio for homeowners who want clarity
            before construction and a calm path from concept to completion.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
              View Portfolio
            </Link>
            <a
              href="mailto:info@cielandstone.com"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/35 bg-white/0 px-6 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              Email the Studio
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-3 sm:gap-4">
            {[
              { label: "Project Range", value: "$50k to $500k+" },
              { label: "Support", value: "Design, planning, build readiness" },
              { label: "Studio Email", value: "info@cielandstone.com" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur sm:p-4">
                <div className="text-[11px] tracking-[0.22em] uppercase text-white/58">{item.label}</div>
                <div className="mt-2 text-sm leading-6 text-white/88">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/15 bg-white/10 p-5 text-white backdrop-blur-xl sm:p-6">
          <div className="text-xs tracking-[0.22em] uppercase text-white/65">What matters first</div>
          <div className="mt-4 grid gap-3 sm:mt-5 sm:gap-4">
            {[
              "Clarity on scope, budget, and the real shape of the work.",
              "Design decisions that are intentional before they become expensive.",
              "A steady team that keeps the experience measured and transparent.",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-black/10 p-3.5 sm:p-4">
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

import Image from "next/image";
import Link from "next/link";
import React from "react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] items-end overflow-hidden">
      <Image
        src="/media/placeholder-16x9.svg"
        alt="Ciel & Stone — hero"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-36">
        <div className="max-w-3xl">
          <h1 className="text-balance text-4xl font-medium leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl">
            Clear direction for homeowners before construction begins.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-white/78 sm:text-lg">
            Ciel &amp; Stone helps homeowners shape ideas into buildable plans through thoughtful design, early
            coordination, and transparent budget visibility.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/projects"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              View Projects
            </Link>
            <Link
              href="/process"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/35 bg-white/0 px-6 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              Our Process
            </Link>
          </div>
        </div>

        <div className="pointer-events-none mt-16 flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-white/70">
          <span className="inline-block h-[1px] w-10 bg-white/40" />
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}

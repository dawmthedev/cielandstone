"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { Project } from "@/lib/data/projects";
import { ProjectCard } from "@/components/projects/project-card";

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function FeaturedProjectsScroller({ projects }: { projects: Project[] }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const reduce = useMemo(() => prefersReducedMotion(), []);
  const interactive = !reduce && projects.length > 1;

  useEffect(() => {
    if (!interactive) return;
    if (!rootRef.current || !trackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const track = trackRef.current;

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-project-card]"));
    const cardCount = Math.max(cards.length, 1);

    const ctx = gsap.context(() => {
      const update = () => {
        const totalScroll = track.scrollWidth - root.clientWidth;
        return totalScroll;
      };

      const tween = gsap.to(track, {
        x: () => -update(),
        ease: "none",
        scrollTrigger: {
          id: "featured-projects",
          trigger: root,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          onUpdate(self) {
            const idx = Math.round(self.progress * (cardCount - 1));
            setActiveIndex(Math.max(0, Math.min(cardCount - 1, idx)));
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, root);

    return () => ctx.revert();
  }, [interactive]);

  const goTo = (index: number) => {
    if (!rootRef.current || !trackRef.current) return;

    const root = rootRef.current;
    const track = trackRef.current;

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-project-card]"));
    const clamped = Math.max(0, Math.min(cards.length - 1, index));

    const target = cards[clamped];
    if (!target) return;

    const left = target.offsetLeft;
    const max = track.scrollWidth - root.clientWidth;
    const x = Math.max(0, Math.min(max, left));

    const st = interactive ? ScrollTrigger.getById("featured-projects") : null;
    if (st) {
      const progress = max === 0 ? 0 : x / max;
      st.scroll(st.start + progress * (st.end - st.start));
    } else {
      track.scrollTo({ left: x, behavior: "smooth" });
    }

    setActiveIndex(clamped);
  };

  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 pt-24">
        <div className="flex items-end justify-between gap-8">
          <div>
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Featured</div>
            <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              Selected work
            </h2>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="h-10 rounded-full border border-black/10 bg-background/70 px-4 text-xs tracking-[0.22em] uppercase text-foreground/80 backdrop-blur hover:text-foreground dark:border-white/10"
              aria-label="Previous project"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="h-10 rounded-full border border-black/10 bg-background/70 px-4 text-xs tracking-[0.22em] uppercase text-foreground/80 backdrop-blur hover:text-foreground dark:border-white/10"
              aria-label="Next project"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div
        ref={rootRef}
        className={interactive ? "relative mt-12 overflow-hidden" : "relative mt-12 overflow-x-auto"}
      >
        <div
          ref={trackRef}
          className="flex gap-6 px-6 pb-24 will-change-transform"
          style={{ touchAction: "pan-y" }}
        >
          {projects.map((p, i) => (
            <div
              key={p.slug}
              data-project-card
              className={interactive ? "w-[84vw] shrink-0 md:w-[70vw] lg:w-[56vw]" : "w-[88vw] shrink-0 md:w-[48vw]"}
            >
              <ProjectCard project={p} priority={i === 0} />
            </div>
          ))}
          <div className={interactive ? "w-[8vw] shrink-0" : "w-6 shrink-0"} />
        </div>
      </div>
    </section>
  );
}

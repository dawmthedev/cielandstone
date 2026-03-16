"use client";

import Image from "next/image";
import React, { useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { easeOutExpo } from "@/lib/utils/motion";

type Chapter = {
  statement: string;
  imageSrc: string;
};

function ChapterImageLayer({
  chapter,
  progress,
  range,
  reduce,
}: {
  chapter: Chapter;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: { start: number; midIn: number; midOut: number; end: number };
  reduce: boolean;
}) {
  const opacity = useTransform(
    progress,
    [range.start, range.midIn, range.midOut, range.end],
    reduce ? [1, 1, 1, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [range.start, range.midIn, range.midOut, range.end],
    reduce ? [0, 0, 0, 0] : [18, 0, 0, -18],
  );
  const scale = useTransform(
    progress,
    [range.start, range.midIn, range.midOut, range.end],
    reduce ? [1, 1, 1, 1] : [1.04, 1.01, 1.01, 1.04],
  );

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0"
      transition={{ duration: 0.6, ease: easeOutExpo }}
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src={chapter.imageSrc} alt="" fill className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/35" />
    </motion.div>
  );
}

function ChapterTextLayer({
  chapter,
  index,
  progress,
  range,
  reduce,
}: {
  chapter: Chapter;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: { start: number; midIn: number; midOut: number; end: number };
  reduce: boolean;
}) {
  const opacity = useTransform(
    progress,
    [range.start, range.midIn, range.midOut, range.end],
    reduce ? [1, 1, 1, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [range.start, range.midIn, range.midOut, range.end],
    reduce ? [0, 0, 0, 0] : [16, 0, 0, -16],
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute left-0 top-0"
      transition={{ duration: 0.6, ease: easeOutExpo }}
    >
      <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Chapter {index + 1}</div>
      <div className="mt-4 text-balance text-2xl font-medium leading-[1.1] tracking-[-0.03em] sm:text-4xl">
        {chapter.statement}
      </div>
      <p className="mt-5 max-w-sm text-sm leading-6 text-foreground/65">
        A single line of clarity can guide hundreds of decisions. We hold the intent steady while details sharpen.
      </p>
    </motion.div>
  );
}

export function MissionChapterSection({ chapters }: { chapters: Chapter[] }) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = !!useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const total = Math.max(chapters.length, 1);

  const chapterProgress = useMemo(() => {
    return chapters.map((_, i) => {
      const start = i / total;
      const midIn = start + 0.08;
      const midOut = start + 0.22;
      const end = (i + 1) / total;
      return { start, midIn, midOut, end };
    });
  }, [chapters, total]);

  return (
    <section ref={ref} className="relative bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Mission</div>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            Story first. Process always.
          </h2>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-28">
        <div className="relative grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-black/10 bg-muted dark:border-white/10">
              {chapters.map((ch, i) => (
                <ChapterImageLayer
                  key={ch.statement}
                  chapter={ch}
                  progress={scrollYProgress}
                  range={chapterProgress[i]}
                  reduce={reduce}
                />
              ))}
              <div className="relative aspect-[16/10]" />
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative h-[220vh]">
              <div className="sticky top-28">
                {chapters.map((ch, i) => (
                  <ChapterTextLayer
                    key={ch.statement}
                    chapter={ch}
                    index={i}
                    progress={scrollYProgress}
                    range={chapterProgress[i]}
                    reduce={reduce}
                  />
                ))}
                <div className="h-[44vh]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

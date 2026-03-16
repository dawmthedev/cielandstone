"use client";

import Image from "next/image";
import React, { useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { easeOutExpo } from "@/lib/utils/motion";

type Chapter = {
  title: string;
  body: string;
  imageSrc: string;
};

function ChapterLayer({
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
    reduce ? [0, 0, 0, 0] : [14, 0, 0, -14],
  );
  const bgY = useTransform(
    progress,
    [range.start, range.end],
    reduce ? [0, 0] : [10, -10],
  );
  const bgScale = useTransform(
    progress,
    [range.start, range.midIn, range.midOut, range.end],
    reduce ? [1, 1, 1, 1] : [1.05, 1.02, 1.02, 1.05],
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-0" transition={{ duration: 0.6, ease: easeOutExpo }}>
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <Image src={chapter.imageSrc} alt="" fill className="object-cover" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/60" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl items-end px-6 pb-20 pt-32">
        <motion.div style={{ y }} className="max-w-2xl">
          <div className="text-xs tracking-[0.22em] uppercase text-white/70">Ciel &amp; Stone</div>
          <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
            {chapter.title}
          </h2>
          <p className="mt-4 text-pretty text-base leading-7 text-white/78 sm:text-lg">{chapter.body}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function IntroNarrativeSequence({ chapters }: { chapters: Chapter[] }) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = !!useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const total = Math.max(chapters.length, 1);
  const ranges = useMemo(() => {
    return chapters.map((_, i) => {
      const start = i / total;
      const midIn = start + 0.09;
      const midOut = start + 0.24;
      const end = (i + 1) / total;
      return { start, midIn, midOut, end };
    });
  }, [chapters, total]);

  return (
    <section ref={ref} className="relative bg-background">
      <div className="relative h-[420vh]">
        <div className="sticky top-0 h-[100dvh] overflow-hidden">
          {chapters.map((ch, i) => (
            <ChapterLayer
              key={ch.title}
              chapter={ch}
              progress={scrollYProgress}
              range={ranges[i]}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

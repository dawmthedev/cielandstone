"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils/cn";
import { easeOutExpo } from "@/lib/utils/motion";

export function ProjectHeroCarousel({
  slug,
  title,
  images,
}: {
  slug: string;
  title: string;
  images: string[];
}) {
  const reduce = !!useReducedMotion();
  const [index, setIndex] = useState(0);

  const safeImages = useMemo(() => (images.length ? images : ["/media/placeholder-16x9.svg"]), [images]);
  const active = safeImages[Math.min(index, safeImages.length - 1)]!;

  const prev = () => setIndex((v) => (v - 1 + safeImages.length) % safeImages.length);
  const next = () => setIndex((v) => (v + 1) % safeImages.length);

  return (
    <div className="relative h-[74dvh] min-h-[520px]">
      <motion.div
        key={active}
        initial={reduce ? { opacity: 1 } : { opacity: 0.0, scale: 1.01 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, ease: easeOutExpo }}
        className="absolute inset-0"
      >
        <motion.div
          layoutId={index === 0 ? `project-image-${slug}` : undefined}
          className="absolute inset-0"
        >
          <Image src={active} alt={title} fill priority className="object-cover" sizes="100vw" />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="mx-auto w-full max-w-6xl px-6 pb-10">
          <div className="flex items-center justify-between">
            <div className="text-xs tracking-[0.22em] uppercase text-white/70">Scroll</div>
            <div className="text-xs tracking-[0.22em] uppercase text-white/60">
              {index + 1}/{safeImages.length}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="h-10 w-10 rounded-full border border-white/15 bg-black/25 text-white/80 backdrop-blur transition-opacity hover:opacity-90"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="h-10 w-10 rounded-full border border-white/15 bg-black/25 text-white/80 backdrop-blur transition-opacity hover:opacity-90"
          >
            ›
          </button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-6xl px-6 pb-12">
        <div className="flex gap-2">
          {safeImages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 w-10 rounded-full bg-white/20 transition-colors",
                i === index ? "bg-white/70" : "hover:bg-white/35",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { easeOutExpo } from "@/lib/utils/motion";

export function ParallaxStorySection({
  title,
  body,
  imageSrc = "/media/placeholder-16x9.svg",
}: {
  title: string;
  body: string;
  imageSrc?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [18, -18]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.04, 1.02, 1.04]);
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.7, 0.9], reduce ? [1, 1, 1, 1] : [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[88dvh] items-end overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src={imageSrc} alt="" fill className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/55" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-32">
        <motion.div
          style={{ opacity: contentOpacity }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="max-w-2xl"
        >
          <h2 className="text-balance text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-pretty text-base leading-7 text-white/78 sm:text-lg">{body}</p>
        </motion.div>
      </div>
    </section>
  );
}

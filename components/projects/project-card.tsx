"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

import type { Project } from "@/lib/data/projects";
import { easeOutExpo } from "@/lib/utils/motion";

export function ProjectCard({ project, priority }: { project: Project; priority?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.7, ease: easeOutExpo }}
      className="group relative"
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <motion.div
          layoutId={`project-card-${project.slug}`}
          className="relative overflow-hidden rounded-2xl border border-black/10 bg-muted dark:border-white/10"
          transition={{ duration: 0.55, ease: easeOutExpo }}
        >
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/0 via-black/10 to-black/35 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative aspect-[16/10]">
          <motion.div layoutId={`project-image-${project.slug}`} className="absolute inset-0">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              priority={priority}
            />
          </motion.div>
        </div>

        <div className="p-6">
          <div className="flex items-baseline justify-between gap-6">
            <h3 className="text-lg font-medium tracking-[-0.02em]">{project.title}</h3>
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/55">{project.category}</div>
          </div>
          <div className="mt-2 text-sm text-foreground/65">{project.location}</div>
          <div className="mt-4 text-sm leading-6 text-foreground/70">{project.shortDescription}</div>
        </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

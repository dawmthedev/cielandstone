"use client";

import React from "react";
import { motion } from "framer-motion";

import type { Project } from "@/lib/data/projects";
import { ProjectHeroCarousel } from "@/components/projects/project-hero-carousel";

export function ProjectDetailHero({ project }: { project: Project }) {
  return (
    <motion.section layoutId={`project-card-${project.slug}`} className="relative isolate overflow-hidden">
      <ProjectHeroCarousel slug={project.slug} title={project.title} images={[project.coverImage, ...project.gallery]} />
    </motion.section>
  );
}

import React from "react";

import { HeroSection } from "@/components/home/hero-section";
import { IntroNarrativeSequence } from "@/components/home/intro-narrative-sequence";
import { FeaturedProjectsScroller } from "@/components/home/featured-projects-scroller";
import { getFeaturedProjects } from "@/lib/data/projects";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <main className="bg-background">
      <HeroSection />

      <IntroNarrativeSequence
        chapters={[
          {
            title: "We start by understanding what matters most.",
            body: "Every project begins with your goals, the realities of the site, and the decisions that will shape scope, timing, and budget.",
            imageSrc: "/media/placeholder-16x9.svg",
          },
          {
            title: "We turn ideas into clear, buildable direction.",
            body: "Layouts, drawings, and models help homeowners see the project clearly before construction decisions become expensive.",
            imageSrc: "/media/placeholder-16x9.svg",
          },
          {
            title: "We bring transparency to budget and coordination.",
            body: "Cost awareness stays part of the conversation so selections, scope, and trade coordination remain grounded and visible.",
            imageSrc: "/media/placeholder-16x9.svg",
          },
          {
            title: "We prepare the project for a smoother construction path.",
            body: "From site planning to finishes, we help organize the details early so the project can move forward with more confidence and fewer surprises.",
            imageSrc: "/media/placeholder-16x9.svg",
          },
        ]}
      />

      <FeaturedProjectsScroller projects={featured} />
    </main>
  );
}

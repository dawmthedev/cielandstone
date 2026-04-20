import React from "react";
import type { Metadata } from "next";

import { LedProcessModel } from "@/components/process/led-process-model";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Learn how Ciel & Stone moves from inquiry and design into coordination and build readiness.",
  alternates: {
    canonical: "/process",
  },
  openGraph: {
    title: "Process | Ciel & Stone",
    description:
      "A clear, residential design-build process for creating luxury homes and additions.",
    url: `${siteConfig.url}/process`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Process | Ciel & Stone",
    description:
      "A clear, residential design-build process for creating luxury homes and additions.",
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProcessPage() {
  return (
    <main>
      <LedProcessModel
        steps={[
          {
            key: "inquire",
            title: "Inquiry",
            summary: "A short conversation to understand your goals, your property, and your budget comfort zone.",
            details: [
              "You share what you want to build, improve, or plan for in the home.",
              "We identify early constraints around site, scope, timing, and investment.",
              "If the fit is right, we outline a clear next step so expectations are visible from the start.",
            ],
          },
          {
            key: "align",
            title: "Alignment",
            summary: "We define scope, priorities, and a realistic path forward.",
            details: [
              "The project scope is organized so major decisions are easier to evaluate.",
              "Budget visibility stays part of the conversation as priorities take shape.",
              "A simple approval rhythm keeps the process calm and transparent.",
            ],
          },
          {
            key: "design",
            title: "Design + Visualization",
            summary: "Ideas become drawings, models, and options you can clearly react to.",
            details: [
              "We study layout, flow, light, and material direction in a practical way.",
              "Visual tools help homeowners understand the design before committing to major choices.",
              "Options stay focused so the project remains buildable and aligned with budget goals.",
            ],
          },
          {
            key: "coordinate",
            title: "Coordination",
            summary: "Project coordination that helps reduce confusion later.",
            details: [
              "Important intersections are reviewed early so problems are easier to spot before construction.",
              "Constructability and sequencing are considered as the project is developed.",
              "The technical depth stays behind the scenes while the client experience stays clear and approachable.",
            ],
          },
          {
            key: "build",
            title: "Build",
            summary: "A more prepared handoff into construction.",
            details: [
              "Drawings, selections, and planning are organized to support the next stage of the project.",
              "Key finish and detail decisions are clarified before they become site issues.",
              "Where required, the work is prepared for coordination with licensed professionals and builders.",
            ],
          },
        ]}
      />
    </main>
  );
}

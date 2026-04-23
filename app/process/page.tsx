import React from "react";
import type { Metadata } from "next";

import { LedProcessModel } from "@/components/process/led-process-model";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Learn how Ciel & Stone moves from discovery and planning into design and build readiness.",
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
            key: "discover",
            title: "Discovery",
            summary: "We start by understanding the house, the priorities, and the practical constraints.",
            details: [
              "You share what you want to change and what matters most to you.",
              "We identify early constraints around scope, timing, budget, and site conditions.",
              "The next step is framed clearly so expectations stay visible from the start.",
            ],
          },
          {
            key: "plan",
            title: "Planning",
            summary: "Scope and investment are organized before design decisions become difficult to unwind.",
            details: [
              "The project scope is clarified so major decisions are easier to evaluate.",
              "Budget visibility stays part of the conversation as priorities take shape.",
              "A measured approval rhythm keeps the process calm and transparent.",
            ],
          },
          {
            key: "design",
            title: "Design",
            summary: "Ideas become drawings, details, and options you can actually respond to.",
            details: [
              "We study layout, flow, light, and material direction in a practical way.",
              "Visual tools help you understand the design before committing to major choices.",
              "Options stay focused so the project remains buildable and aligned with the budget.",
            ],
          },
          {
            key: "coordinate",
            title: "Preconstruction",
            summary: "Technical details are resolved early so the site phase is steadier and more predictable.",
            details: [
              "Important intersections are reviewed before they become expensive site issues.",
              "Constructability and sequencing are considered as the project is developed.",
              "The technical depth stays organized behind the scenes while the experience stays clear.",
            ],
          },
          {
            key: "build",
            title: "Build",
            summary: "The project enters construction with a clearer set of expectations.",
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

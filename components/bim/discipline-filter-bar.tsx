"use client";

import React from "react";
import { motion } from "framer-motion";

import type { ProjectSystem } from "@/lib/data/projects";
import { cn } from "@/lib/utils/cn";

const labels: Record<ProjectSystem, string> = {
  architectural: "Architectural",
  structural: "Structural",
  plumbing: "Plumbing",
  electrical: "Electrical",
  hvac: "HVAC",
  site: "Site",
};

export function DisciplineFilterBar({
  available,
  activeSystem,
  onSelect,
  fullModel,
  onFullModel,
  exploded,
  onExploded,
}: {
  available: ProjectSystem[];
  activeSystem: ProjectSystem | null;
  onSelect: (s: ProjectSystem) => void;
  fullModel: boolean;
  onFullModel: () => void;
  exploded: boolean;
  onExploded: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onFullModel}
        className={cn(
          "relative h-10 overflow-hidden rounded-full border px-4 text-xs tracking-[0.22em] uppercase backdrop-blur",
          fullModel
            ? "border-black/15 bg-foreground text-background dark:border-white/15"
            : "border-black/10 bg-background/70 text-foreground/80 hover:text-foreground dark:border-white/10",
        )}
      >
        Full Model
      </button>

      {available.map((s) => {
        const isActive = !fullModel && activeSystem === s;
        return (
          <button
            key={s}
            type="button"
            onClick={() => onSelect(s)}
            className={cn(
              "relative h-10 overflow-hidden rounded-full border px-4 text-xs tracking-[0.22em] uppercase backdrop-blur",
              isActive
                ? "border-black/15 text-background dark:border-white/15"
                : "border-black/10 bg-background/70 text-foreground/80 hover:text-foreground dark:border-white/10",
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="bim-led-pill"
                className="pointer-events-none absolute inset-0 bg-foreground"
                style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.14) inset, 0 0 24px rgba(255,255,255,0.22)" }}
                transition={{ type: "spring", stiffness: 520, damping: 44, mass: 0.6 }}
              />
            ) : null}
            <span className="relative z-10">{labels[s]}</span>
          </button>
        );
      })}

      <button
        type="button"
        onClick={onExploded}
        className={cn(
          "relative h-10 overflow-hidden rounded-full border px-4 text-xs tracking-[0.22em] uppercase backdrop-blur",
          exploded
            ? "border-black/15 bg-foreground text-background dark:border-white/15"
            : "border-black/10 bg-background/70 text-foreground/80 hover:text-foreground dark:border-white/10",
        )}
      >
        Exploded
      </button>
    </div>
  );
}

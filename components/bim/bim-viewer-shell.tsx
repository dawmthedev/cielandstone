"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

import type { ProjectSystem } from "@/lib/data/projects";
import { DisciplineFilterBar } from "@/components/bim/discipline-filter-bar";

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function lowPerfDevice() {
  if (typeof navigator === "undefined") return true;
  const hc = navigator.hardwareConcurrency ?? 4;
  const dm = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4;
  return hc <= 4 || dm <= 4;
}

const BIMViewerCanvas = dynamic(() => import("@/components/bim/bim-viewer-canvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted">
      <div className="h-6 w-6 animate-pulse rounded-full bg-foreground/20" />
    </div>
  ),
});

export function BIMViewerShell({
  posterSrc,
  modelUrl,
  availableSystems,
  eager,
}: {
  posterSrc: string;
  modelUrl?: string;
  availableSystems: ProjectSystem[];
  eager?: boolean;
}) {
  const reduce = useMemo(() => prefersReducedMotion(), []);
  const lowPerf = useMemo(() => lowPerfDevice(), []);

  const [fullModel, setFullModel] = useState(true);
  const [exploded, setExploded] = useState(false);
  const [activeSystem, setActiveSystem] = useState<ProjectSystem | null>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const [shouldLoad, setShouldLoad] = useState(!!eager);
  const ref = useRef<HTMLDivElement | null>(null);
  const fullscreenRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (eager) return;
    if (!ref.current) return;
    const el = ref.current;

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "300px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  useEffect(() => {
    const onChange = () => {
      if (typeof document === "undefined") return;
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const onSelect = (s: ProjectSystem) => {
    setFullModel(false);
    setActiveSystem(s);
  };

  const onFullModel = () => {
    setFullModel(true);
    setActiveSystem(null);
  };

  const onToggleFullscreen = async () => {
    if (typeof document === "undefined") return;
    const el = fullscreenRef.current;
    if (!el) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await el.requestFullscreen();
      }
    } catch {
      return;
    }
  };

  const showPoster = reduce || lowPerf || !shouldLoad;
  const activeSystems = fullModel ? availableSystems : activeSystem ? [activeSystem] : availableSystems;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">BIM Viewer</div>
          <h2 className="mt-4 text-balance text-3xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl">
            Explore the model
          </h2>
          <p className="mt-6 text-pretty text-sm leading-6 text-foreground/65 sm:text-base">
            This is a performant scaffold viewer. Swap in optimized GLBs and system-named meshes later for full
            discipline filtering.
          </p>
        </div>

        <DisciplineFilterBar
          available={availableSystems}
          activeSystem={activeSystem}
          onSelect={onSelect}
          fullModel={fullModel}
          onFullModel={onFullModel}
          exploded={exploded}
          onExploded={() => setExploded((v) => !v)}
        />
      </div>

      <div
        ref={ref}
        className="mt-10 overflow-hidden rounded-2xl border border-black/10 bg-muted dark:border-white/10"
      >
        <div ref={fullscreenRef} className="relative aspect-[16/10]">
          {showPoster ? (
            <Image src={posterSrc} alt="" fill className="object-cover" sizes="100vw" />
          ) : (
            <BIMViewerCanvas modelUrl={modelUrl} activeSystems={activeSystems} exploded={exploded} />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />

          <button
            type="button"
            onClick={onToggleFullscreen}
            aria-pressed={isFullscreen}
            className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-[11px] tracking-[0.22em] uppercase text-white/80 backdrop-blur hover:text-white"
          >
            {isFullscreen ? "Exit" : "Full"}
          </button>
        </div>
      </div>
    </section>
  );
}

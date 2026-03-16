"use client";

import Lenis from "lenis";
import React, { useEffect, useMemo } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function canUseLenis() {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return false;

  try {
    void window.performance?.now?.();
    return true;
  } catch {
    return false;
  }
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const enabled = useMemo(() => canUseLenis(), []);

  useEffect(() => {
    if (!enabled) return;

    let lenis: Lenis | null = null;
    let rafId = 0;

    try {
      lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        syncTouch: true,
        touchMultiplier: 1.3,
        wheelMultiplier: 0.9,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    } catch {
      return;
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, [enabled]);

  return <>{children}</>;
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.gtag) return;

    window.gtag("config", measurementId, {
      page_path: pathname,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [measurementId, pathname]);

  return null;
}

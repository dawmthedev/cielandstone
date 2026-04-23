"use client";

import { useEffect, useState } from "react";

/**
 * Captures marketing source data for attribution. UTMs and click IDs are
 * sticky — stored in sessionStorage on first visit and reused on every
 * subsequent form submit during the session. So a visitor who clicks an
 * Instagram ad, browses three pages, then submits from the homepage, still
 * gets attributed to the ad click — not to the direct homepage view.
 */

export type LeadSourceClient = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
  landingPath?: string;
};

const STORAGE_KEY = "cs_lead_source";

function readStorage(): LeadSourceClient | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LeadSourceClient;
  } catch {
    return null;
  }
}

function writeStorage(value: LeadSourceClient) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* storage blocked or full — silently drop. */
  }
}

function captureFromUrl(): LeadSourceClient {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") ?? undefined,
    utmMedium: params.get("utm_medium") ?? undefined,
    utmCampaign: params.get("utm_campaign") ?? undefined,
    utmTerm: params.get("utm_term") ?? undefined,
    utmContent: params.get("utm_content") ?? undefined,
    gclid: params.get("gclid") ?? undefined,
    fbclid: params.get("fbclid") ?? undefined,
    referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
    landingPath: window.location.pathname + window.location.search,
  };
}

function merge(a: LeadSourceClient, b: LeadSourceClient): LeadSourceClient {
  // First-touch wins for attribution — we only fill in blanks from b.
  const out: LeadSourceClient = { ...a };
  (Object.keys(b) as (keyof LeadSourceClient)[]).forEach((k) => {
    if (!out[k] && b[k]) out[k] = b[k];
  });
  return out;
}

/**
 * Returns the current lead source for this session.
 * Idempotent — safe to call on every render; only writes storage once.
 */
export function useLeadSource(): LeadSourceClient {
  const [source, setSource] = useState<LeadSourceClient>({});

  useEffect(() => {
    const existing = readStorage();
    const fromUrl = captureFromUrl();
    const hasNewUtms = !!(
      fromUrl.utmSource || fromUrl.utmMedium || fromUrl.utmCampaign || fromUrl.gclid || fromUrl.fbclid
    );

    let next: LeadSourceClient;
    if (existing && !hasNewUtms) {
      // Keep the existing attribution — this is a later pageview in the same session.
      next = { ...existing, landingPath: existing.landingPath ?? fromUrl.landingPath };
    } else if (existing && hasNewUtms) {
      // New campaign touchpoint within the same session; keep first-touch but record the latest landing.
      next = merge(existing, { ...fromUrl, landingPath: existing.landingPath });
    } else {
      next = fromUrl;
    }
    writeStorage(next);
    // Intentional: synchronize React state with external storage on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSource(next);
  }, []);

  return source;
}

/**
 * Build a payload extension with a `source` object for API submission.
 * Optional extras (service, location) are merged in at submit time.
 */
export function withSource(
  base: Record<string, unknown>,
  source: LeadSourceClient,
  extras?: { service?: string; location?: string },
): Record<string, unknown> {
  return {
    ...base,
    source: {
      ...source,
      ...extras,
    },
  };
}

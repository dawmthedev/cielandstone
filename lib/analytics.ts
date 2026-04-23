/**
 * Unified conversion tracking across GA4 + Meta Pixel.
 * Safe to call in any client component — no-ops on server and when scripts are blocked.
 *
 * Ad channels optimize against conversion events. If the event doesn't fire,
 * the ad spend is effectively blind. This file is the single source of truth
 * for what counts as a conversion on the site.
 */

type GtagFn = (...args: unknown[]) => void;
type FbqFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    fbq?: FbqFn;
  }
}

export type FormSubmitEvent = {
  form: "contact" | "feasibility";
  service?: string;
  location?: string;
  tier?: "A" | "B" | "C";
  /** Used to generate a stable user-data hash for ad platforms if needed. */
  email?: string;
};

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  try {
    window.gtag(...args);
  } catch (err) {
    console.warn("[analytics:gtag]", err);
  }
}

function fbq(...args: unknown[]) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  try {
    window.fbq(...args);
  } catch (err) {
    console.warn("[analytics:fbq]", err);
  }
}

/**
 * Fire a conversion event on GA4 and Meta Pixel when a lead form submits.
 * Both platforms need this for ad optimization. The Meta `Lead` event and
 * GA4 `generate_lead` event are the standard conversion signals.
 */
export function trackFormSubmit(e: FormSubmitEvent): void {
  // GA4 — Enhanced conversions support
  gtag("event", "generate_lead", {
    form_name: e.form,
    service: e.service,
    location: e.location,
    tier: e.tier,
    value: e.form === "feasibility" ? 9500 : 0,
    currency: "USD",
  });

  // Meta Pixel — Lead event is the standard Meta conversion for lead-gen ads
  fbq("track", "Lead", {
    content_name: e.form,
    content_category: e.service,
    tier: e.tier,
    location: e.location,
    value: e.form === "feasibility" ? 9500 : 0,
    currency: "USD",
  });
}

/**
 * Track clicks on CTA buttons. Lightweight — helps identify which CTAs
 * drive conversions, and which landing pages produce engaged traffic.
 */
export function trackCtaClick(e: {
  cta: string;
  destination: string;
  placement?: string;
  service?: string;
  location?: string;
}): void {
  gtag("event", "cta_click", {
    cta_label: e.cta,
    destination: e.destination,
    placement: e.placement,
    service: e.service,
    location: e.location,
  });

  fbq("trackCustom", "CtaClick", {
    cta: e.cta,
    placement: e.placement,
    service: e.service,
    location: e.location,
  });
}

/**
 * Called when a visitor lands on a service landing page — useful for
 * retargeting setup and building custom Meta audiences.
 */
export function trackLandingView(e: { service?: string; location?: string }): void {
  fbq("trackCustom", "LandingView", {
    service: e.service,
    location: e.location,
  });
  gtag("event", "landing_view", {
    service: e.service,
    location: e.location,
  });
}

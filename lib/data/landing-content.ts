import {
  adjustInvestmentRange,
  getLocationBySlug,
  type Location,
  type LocationSlug,
} from "./locations";
import { getServiceBySlug, type Service, type ServiceSlug } from "./services";

export type LandingContent = {
  service: Service;
  location: Location | null;
  /** Fully resolved investment range for this service × location. */
  investmentRange: string;
  /** Hero headline, possibly location-flavored. */
  heroHeadline: string;
  /** Hero subheadline, possibly location-flavored. */
  heroSub: string;
  /** Location-aware anchor line under hero (small type). */
  anchorLine: string;
  /** Extra location-specific FAQ entries. */
  locationFaq: { q: string; a: string }[];
  /** Extra location-specific risk / consideration notes. */
  locationConsiderations: string[];
  /** SEO metadata. */
  seo: {
    title: string;
    description: string;
    canonicalPath: string;
  };
};

function buildHeroSub(service: Service, location: Location | null): string {
  if (!location) return service.heroSub;
  const prefix =
    location.region === "greater-la"
      ? `For homes across ${location.displayName} and the surrounding neighborhoods.`
      : `For homes across ${location.displayName} and the surrounding Pacific Northwest.`;
  return `${prefix} ${service.heroSub}`;
}

function buildAnchorLine(service: Service, location: Location | null, investmentRange: string): string {
  if (!location) {
    return `${investmentRange}  ·  ${service.timelineRange}  ·  Los Angeles + Pacific Northwest`;
  }
  return `${investmentRange}  ·  ${service.timelineRange}  ·  ${location.displayName}`;
}

function buildLocationFaq(service: Service, location: Location | null): { q: string; a: string }[] {
  if (!location) return [];
  const faq: { q: string; a: string }[] = [];

  faq.push({
    q: `Do you work on ${service.shortName.toLowerCase()} in ${location.name}?`,
    a: `Yes. ${location.name} is one of our primary markets. ${location.marketContext}`,
  });

  faq.push({
    q: `How long does a ${service.adName.toLowerCase()} take in ${location.name}?`,
    a: `Construction typically runs ${service.timelineRange} once permits are in hand. In ${location.name}, plan on ${location.permitTimelineMonths} for permit review before construction begins.`,
  });

  // Jurisdiction-specific FAQ
  if (location.slug === "malibu") {
    faq.push({
      q: `Does the Coastal Commission apply to my ${service.shortName.toLowerCase()} project?`,
      a: `For most oceanfront and visible coastal-zone projects in Malibu, yes. Coastal Commission review can add 6 to 12 months to the entitlement window. We scope this explicitly in the Feasibility Read so the timeline you plan against is the real one.`,
    });
  }
  if (location.slug === "malibu" || location.slug === "pacific-palisades") {
    faq.push({
      q: `What does VHFHSZ construction mean for cost and timeline?`,
      a: `Very High Fire Hazard Severity Zone requirements — Class A roofing, ignition-resistant siding, ember-resistant vents, non-combustible 5-ft zone — add 8 to 15% to envelope cost on most projects. We plan this into the bracketed pricing before drawings, not after.`,
    });
  }
  if (location.slug === "beverly-hills") {
    faq.push({
      q: `Does Beverly Hills Design Review apply?`,
      a: `Design Review applies to most exterior and addition work in Beverly Hills. Plan for 4 to 8 months in permitting. Landscape and tree preservation review are strict; we coordinate all of this during preconstruction.`,
    });
  }
  if (location.slug === "hancock-park" || location.slug === "pasadena") {
    faq.push({
      q: `Does HPOZ or Landmark review apply to my project?`,
      a: `For most exterior work in ${location.name}'s protected historic districts, yes. We're HPOZ-literate — we plan period-appropriate detailing and the Board approval path into the preconstruction schedule.`,
    });
  }
  if (location.region === "pnw") {
    faq.push({
      q: `Do Pacific Northwest energy codes affect my ${service.shortName.toLowerCase()} project?`,
      a: `${location.state === "OR" ? "Oregon" : "Washington"} residential energy codes are stringent. For most scopes of ${service.shortName.toLowerCase()} work, this affects envelope, glazing, and mechanical selections. We scope compliance explicitly so there are no surprises at inspection.`,
    });
  }

  return faq;
}

function buildLocationConsiderations(service: Service, location: Location | null): string[] {
  if (!location) return [];
  const notes: string[] = [];

  if (location.slug === "malibu") {
    notes.push("Coastal Commission review and VHFHSZ ignition codes are the critical path, not the construction window. We map both in preconstruction.");
  }
  if (location.slug === "pacific-palisades") {
    notes.push("Coastal overlay and VHFHSZ compliance are standard on most lots. Rebuild pathways post-wildfire have specific requirements we scope up front.");
  }
  if (location.slug === "beverly-hills") {
    notes.push("Design Review is the permit critical path. We plan 4–8 months for entitlement in all timelines we quote.");
  }
  if (location.slug === "hancock-park" || location.slug === "pasadena") {
    notes.push("Historic district review requires period-appropriate detailing and HPOZ / Landmark Board approval — we integrate this into design development, not after.");
  }
  if (location.slug === "santa-monica") {
    notes.push("Santa Monica Building Department permit timelines run longer than LADBS — we plan 4–7 months for residential permits into every schedule.");
  }
  if (location.region === "pnw") {
    notes.push(`${location.state === "OR" ? "Oregon" : "Washington"} residential energy codes require envelope, glazing, and mechanical selections to meet stringent performance standards. We scope compliance during preconstruction.`);
  }
  if (
    (service.slug === "pools-spas" || service.slug === "additions" || service.slug === "new-builds") &&
    (location.slug === "malibu" || location.slug === "pacific-palisades" || location.slug === "brentwood")
  ) {
    notes.push("Hillside and bluff lots in this area often require geotechnical engineering, retention, and drainage scope that significantly affects cost. We map this before design spend begins.");
  }

  return notes;
}

function buildSeo(service: Service, location: Location | null, investmentRange: string) {
  if (!location) {
    return {
      title: service.metaTitle,
      description: service.metaDescription,
      canonicalPath: `/services/${service.slug}`,
    };
  }
  const title = `${service.adName} in ${location.name} — Luxury Design-Build Studio`;
  const description = `${service.adName} by Ciel & Stone in ${location.displayName}. ${investmentRange} typical range, ${service.timelineRange} typical timeline. Design-build studio with Feasibility Read.`;
  return {
    title,
    description,
    canonicalPath: `/services/${service.slug}/${location.slug}`,
  };
}

export function getLandingContent(
  serviceSlug: ServiceSlug | string,
  locationSlug: LocationSlug | string | null,
): LandingContent | null {
  const service = getServiceBySlug(String(serviceSlug));
  if (!service) return null;

  const location = locationSlug ? getLocationBySlug(String(locationSlug)) : null;

  const investmentRange = location
    ? adjustInvestmentRange(service.investmentRange, location.investmentTier)
    : service.investmentRange;

  const heroHeadline = service.heroHeadline;
  const heroSub = buildHeroSub(service, location);
  const anchorLine = buildAnchorLine(service, location, investmentRange);
  const locationFaq = buildLocationFaq(service, location);
  const locationConsiderations = buildLocationConsiderations(service, location);
  const seo = buildSeo(service, location, investmentRange);

  return {
    service,
    location,
    investmentRange,
    heroHeadline,
    heroSub,
    anchorLine,
    locationFaq,
    locationConsiderations,
    seo,
  };
}

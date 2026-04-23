export type LocationSlug =
  | "los-angeles"
  | "beverly-hills"
  | "malibu"
  | "pacific-palisades"
  | "brentwood"
  | "santa-monica"
  | "manhattan-beach"
  | "pasadena"
  | "hancock-park"
  | "portland"
  | "seattle"
  | "bellevue";

export type LocationRegion = "greater-la" | "pnw";

export type Location = {
  slug: LocationSlug;
  name: string;
  displayName: string;
  region: LocationRegion;
  regionLabel: string;
  state: string;
  /** Tier multiplier for typical investment framing. 1.0 = baseline. */
  investmentTier: 1 | 1.15 | 1.3 | 1.5;
  marketContext: string;
  architecturalCharacter: string;
  jurisdictionNotes: string[];
  neighborhoods: string[];
  adjacentLocations: LocationSlug[];
  permitTimelineMonths: string;
  metaTitleLocation: string;
  latLng?: [number, number];
};

export const locations: Location[] = [
  {
    slug: "los-angeles",
    name: "Los Angeles",
    displayName: "Los Angeles, California",
    region: "greater-la",
    regionLabel: "Greater Los Angeles",
    state: "CA",
    investmentTier: 1.15,
    marketContext:
      "Los Angeles is the most architecturally heterogeneous residential market in the country — Case Study houses sit next to Spanish Colonials which sit next to mid-century glass boxes. Any serious residential work here starts with the question the city itself never answers: which house are we serving, and which architectural lineage does it belong to?",
    architecturalCharacter:
      "Spanish Colonial, mid-century modern, Case Study, English Tudor, California bungalow, contemporary modernist.",
    jurisdictionNotes: [
      "LADBS permit timelines vary 6–16 weeks for standard residential; longer in hillside or coastal zones.",
      "Title 24 energy compliance applies to all major residential work.",
      "Hillside Ordinance, Specific Plans, and overlay districts can change what's buildable on a given lot.",
      "Expect an arborist report and protected-tree review on many lots.",
    ],
    neighborhoods: [
      "Silver Lake",
      "Los Feliz",
      "Echo Park",
      "West Hollywood",
      "Mar Vista",
      "Venice",
      "Mid-City",
      "Highland Park",
      "Eagle Rock",
      "Studio City",
      "Sherman Oaks",
      "Culver City",
    ],
    adjacentLocations: ["beverly-hills", "brentwood", "santa-monica", "pasadena", "hancock-park"],
    permitTimelineMonths: "3–6 months",
    metaTitleLocation: "Los Angeles",
    latLng: [34.0522, -118.2437],
  },
  {
    slug: "beverly-hills",
    name: "Beverly Hills",
    displayName: "Beverly Hills, California",
    region: "greater-la",
    regionLabel: "Greater Los Angeles",
    state: "CA",
    investmentTier: 1.5,
    marketContext:
      "Beverly Hills residential work is subject to one of the most rigorous design review processes in the country. The city maintains strict architectural, landscape, and construction standards — which is part of why the work that gets built here tends to be done well, and why the planning window is longer than in surrounding LA jurisdictions.",
    architecturalCharacter:
      "Spanish Revival, Mediterranean, English Tudor Revival, Regency, French Provincial, contemporary traditional.",
    jurisdictionNotes: [
      "Beverly Hills building department reviews every major residential project — plan on 4–8 months for permit.",
      "Design Review required for most exterior and addition work.",
      "Landscape review and mature tree preservation requirements are strict.",
      "Construction hours are tightly regulated; site plan and staging must be approved.",
    ],
    neighborhoods: [
      "Beverly Hills Flats",
      "Beverly Hills Post Office (BHPO)",
      "Trousdale Estates",
      "Beverly Park",
      "Crescent Drive",
      "North of Sunset",
    ],
    adjacentLocations: ["los-angeles", "brentwood", "hancock-park"],
    permitTimelineMonths: "4–8 months",
    metaTitleLocation: "Beverly Hills",
    latLng: [34.0736, -118.4004],
  },
  {
    slug: "malibu",
    name: "Malibu",
    displayName: "Malibu, California",
    region: "greater-la",
    regionLabel: "Greater Los Angeles",
    state: "CA",
    investmentTier: 1.5,
    marketContext:
      "Malibu residential is the intersection of three hard constraints: Coastal Commission review, Very High Fire Hazard Severity Zone (VHFHSZ) ignition codes, and hillside or bluff geotechnical realities. Beautiful work is possible here — but only if the preconstruction phase takes those constraints seriously from day one.",
    architecturalCharacter:
      "Coastal modernist, Cape Cod, California ranch, contemporary glass-and-wood, Mediterranean beach.",
    jurisdictionNotes: [
      "Coastal Commission review adds 6–12 months for many projects; entitlement planning is the critical path, not construction.",
      "VHFHSZ compliance requires Class A roofing, ignition-resistant siding, ember-resistant vents, and strict 5-ft non-combustible zone around structures.",
      "Septic, geotechnical, and bluff-setback requirements apply to most lots.",
      "Materials cost and trade availability are measurably higher than interior LA.",
    ],
    neighborhoods: [
      "Point Dume",
      "Malibu Cove Colony",
      "Broad Beach",
      "Serra Retreat",
      "La Costa Beach",
      "Paradise Cove",
      "Big Rock",
    ],
    adjacentLocations: ["pacific-palisades", "santa-monica"],
    permitTimelineMonths: "9–18 months",
    metaTitleLocation: "Malibu",
    latLng: [34.0259, -118.7798],
  },
  {
    slug: "pacific-palisades",
    name: "Pacific Palisades",
    displayName: "Pacific Palisades, California",
    region: "greater-la",
    regionLabel: "Greater Los Angeles",
    state: "CA",
    investmentTier: 1.3,
    marketContext:
      "Pacific Palisades residential sits in a coastal overlay, with portions of the neighborhood in VHFHSZ zones. The architectural vocabulary leans contemporary modernist and coastal Mediterranean, with a strong subset of mid-century homes that need careful, respectful renovation.",
    architecturalCharacter:
      "Contemporary modernist, coastal Mediterranean, mid-century modern, Cape Cod.",
    jurisdictionNotes: [
      "Coastal overlay applies to ocean-facing lots — Coastal Commission review can be required.",
      "VHFHSZ ignition-resistant construction applies to most of the Highlands and Riviera.",
      "Bluff setbacks and geotechnical review apply to hillside work.",
      "Post-wildfire rebuild pathway exists but requires specific compliance.",
    ],
    neighborhoods: [
      "Huntington Palisades",
      "Palisades Riviera",
      "Highlands",
      "Alphabet Streets",
      "Castellammare",
    ],
    adjacentLocations: ["malibu", "santa-monica", "brentwood"],
    permitTimelineMonths: "5–10 months",
    metaTitleLocation: "Pacific Palisades",
    latLng: [34.0344, -118.5296],
  },
  {
    slug: "brentwood",
    name: "Brentwood",
    displayName: "Brentwood, California",
    region: "greater-la",
    regionLabel: "Greater Los Angeles",
    state: "CA",
    investmentTier: 1.3,
    marketContext:
      "Brentwood residential runs from flat-lot traditional homes south of Sunset to hillside modernist work above Kenter and Mandeville. Scope ranges from kitchen and primary suite renovations on walk-street homes to full ground-up custom residential on canyon lots.",
    architecturalCharacter:
      "Traditional, Colonial, Cape Cod, contemporary modernist, Mediterranean.",
    jurisdictionNotes: [
      "LADBS permit for most work; hillside lots subject to Hillside Ordinance.",
      "Protected trees are common; arborist reports routinely required.",
      "Brentwood Homeowners Association reviews exterior work in many tracts.",
    ],
    neighborhoods: [
      "Brentwood Park",
      "Brentwood Glen",
      "Kenter Canyon",
      "Mandeville Canyon",
      "Crestwood Hills",
      "Sullivan Canyon",
    ],
    adjacentLocations: ["los-angeles", "santa-monica", "pacific-palisades", "beverly-hills"],
    permitTimelineMonths: "3–7 months",
    metaTitleLocation: "Brentwood",
    latLng: [34.0628, -118.4842],
  },
  {
    slug: "santa-monica",
    name: "Santa Monica",
    displayName: "Santa Monica, California",
    region: "greater-la",
    regionLabel: "Greater Los Angeles",
    state: "CA",
    investmentTier: 1.15,
    marketContext:
      "Santa Monica has its own building department with a well-earned reputation for rigor. Walk-street blocks, North of Montana, and the bluffs contain a mix of period-restored bungalows, contemporary modernist, and traditional estate work.",
    architecturalCharacter:
      "California bungalow, Spanish Revival, contemporary modernist, traditional.",
    jurisdictionNotes: [
      "Santa Monica Building Department permit timelines run longer than LADBS — plan for 4–7 months.",
      "Landmark Commission review for designated structures and historic districts.",
      "Stringent energy, water, and sustainability compliance.",
    ],
    neighborhoods: [
      "North of Montana",
      "Sunset Park",
      "Ocean Park",
      "Wilshire / Montana",
      "Mid-City Santa Monica",
    ],
    adjacentLocations: ["los-angeles", "brentwood", "pacific-palisades", "manhattan-beach"],
    permitTimelineMonths: "4–7 months",
    metaTitleLocation: "Santa Monica",
    latLng: [34.0195, -118.4912],
  },
  {
    slug: "manhattan-beach",
    name: "Manhattan Beach",
    displayName: "Manhattan Beach, California",
    region: "greater-la",
    regionLabel: "Greater Los Angeles",
    state: "CA",
    investmentTier: 1.15,
    marketContext:
      "Manhattan Beach is a constrained-lot coastal market where small square footage, tight setbacks, and high-end finishes set the design problem. Walk street homes, Hill section, and Sand section each have their own character.",
    architecturalCharacter:
      "Cape Cod, contemporary coastal, beach modern, transitional.",
    jurisdictionNotes: [
      "Manhattan Beach permit process is thorough; plan 3–6 months for standard residential.",
      "Strict height, FAR, and setback rules.",
      "Sand section and Hill section have their own constraints.",
    ],
    neighborhoods: [
      "Sand Section",
      "Hill Section",
      "Tree Section",
      "El Porto",
    ],
    adjacentLocations: ["santa-monica", "los-angeles"],
    permitTimelineMonths: "3–6 months",
    metaTitleLocation: "Manhattan Beach",
    latLng: [33.8847, -118.4109],
  },
  {
    slug: "pasadena",
    name: "Pasadena",
    displayName: "Pasadena, California",
    region: "greater-la",
    regionLabel: "Greater Los Angeles",
    state: "CA",
    investmentTier: 1.15,
    marketContext:
      "Pasadena residential is dominated by Craftsman, Spanish Colonial Revival, and period estate homes that deserve careful, historically intelligent work. Landmark Districts and the city's design review process favor firms that understand preservation.",
    architecturalCharacter:
      "Craftsman, Greene & Greene, Spanish Colonial Revival, Tudor Revival, Mediterranean estate.",
    jurisdictionNotes: [
      "Landmark District (LD) and Historic Preservation Overlay review common; Landmark Commission approvals can add 3–5 months.",
      "Many homes are eligible for Mills Act — significant property tax benefit for historic preservation.",
      "Pasadena permit process is professional but deliberate; plan 3–7 months.",
    ],
    neighborhoods: [
      "San Rafael",
      "Oak Knoll",
      "Madison Heights",
      "Bungalow Heaven",
      "Prospect Park",
      "Linda Vista",
      "Arroyo Seco",
    ],
    adjacentLocations: ["los-angeles", "hancock-park"],
    permitTimelineMonths: "3–7 months",
    metaTitleLocation: "Pasadena",
    latLng: [34.1478, -118.1445],
  },
  {
    slug: "hancock-park",
    name: "Hancock Park",
    displayName: "Hancock Park, Los Angeles",
    region: "greater-la",
    regionLabel: "Greater Los Angeles",
    state: "CA",
    investmentTier: 1.3,
    marketContext:
      "Hancock Park and the surrounding HPOZ-protected neighborhoods (Windsor Square, Larchmont, Western Heights) contain some of LA's most architecturally significant period homes. Work here requires an HPOZ-literate approach — you're restoring, not replacing.",
    architecturalCharacter:
      "English Tudor, Spanish Colonial Revival, Georgian, French Normandy, American Colonial Revival.",
    jurisdictionNotes: [
      "HPOZ (Historic Preservation Overlay Zone) review applies to most work — exterior changes and additions require HPOZ Board approval.",
      "Plan for 3–5 month HPOZ entitlement window on most exterior scopes.",
      "Preservation plan and period-appropriate detailing required.",
    ],
    neighborhoods: [
      "Hancock Park",
      "Windsor Square",
      "Larchmont Village",
      "Western Heights",
      "Fremont Place",
      "Windsor Village",
    ],
    adjacentLocations: ["los-angeles", "beverly-hills", "pasadena"],
    permitTimelineMonths: "5–9 months",
    metaTitleLocation: "Hancock Park",
    latLng: [34.0736, -118.3342],
  },
  {
    slug: "portland",
    name: "Portland",
    displayName: "Portland, Oregon",
    region: "pnw",
    regionLabel: "Pacific Northwest",
    state: "OR",
    investmentTier: 1,
    marketContext:
      "Portland residential is a rigorous market — strong historic Craftsman and Foursquare stock, progressive sustainability codes, and a deep tradition of design-led residential. The best work here integrates climate response, restraint, and long-term material honesty.",
    architecturalCharacter:
      "Craftsman, Foursquare, Old Portland, Pacific Northwest modernist, mid-century.",
    jurisdictionNotes: [
      "Portland Bureau of Development Services permits most residential work; plan 3–6 months for moderate scope.",
      "Historic Resource Review for designated landmarks and conservation districts.",
      "Stormwater management, landscape, and tree preservation requirements are detailed.",
      "Oregon energy code (REACH / Oregon Residential Specialty Code) is stringent.",
    ],
    neighborhoods: [
      "Alameda",
      "Laurelhurst",
      "Irvington",
      "Eastmoreland",
      "Dunthorpe",
      "West Hills",
      "Northwest District",
      "Mt. Tabor",
    ],
    adjacentLocations: ["seattle"],
    permitTimelineMonths: "3–6 months",
    metaTitleLocation: "Portland",
    latLng: [45.5152, -122.6784],
  },
  {
    slug: "seattle",
    name: "Seattle",
    displayName: "Seattle, Washington",
    region: "pnw",
    regionLabel: "Pacific Northwest",
    state: "WA",
    investmentTier: 1,
    marketContext:
      "Seattle residential balances steep-site challenges, heritage Craftsman and mid-century stock, and an increasingly confident contemporary modernist vernacular. Waterfront, view, and hillside lots drive real cost variability.",
    architecturalCharacter:
      "Craftsman, Northwest modernist, contemporary, mid-century, Tudor.",
    jurisdictionNotes: [
      "Seattle SDCI permit timelines run 3–8 months depending on scope and zoning.",
      "Landmark review for designated buildings and conservation districts.",
      "Stringent stormwater, drainage, and tree preservation codes.",
      "Steep slope overlay requires geotechnical review on many view lots.",
    ],
    neighborhoods: [
      "Madrona",
      "Madison Park",
      "Magnolia",
      "Laurelhurst",
      "Queen Anne",
      "Windermere",
      "Capitol Hill",
      "Washington Park",
    ],
    adjacentLocations: ["bellevue", "portland"],
    permitTimelineMonths: "3–8 months",
    metaTitleLocation: "Seattle",
    latLng: [47.6062, -122.3321],
  },
  {
    slug: "bellevue",
    name: "Bellevue",
    displayName: "Bellevue, Washington",
    region: "pnw",
    regionLabel: "Pacific Northwest",
    state: "WA",
    investmentTier: 1.15,
    marketContext:
      "Bellevue residential is characterized by larger lot sizes, contemporary estate work, and a strong market for ground-up custom residential and full-home renovations. The permit process is professional and predictable.",
    architecturalCharacter:
      "Contemporary modernist, Northwest modernist, transitional, traditional estate.",
    jurisdictionNotes: [
      "Bellevue Development Services permits most work; plan 3–6 months for moderate scope.",
      "Critical areas (steep slopes, wetlands, streams) require specialized review.",
      "Shoreline Master Program applies to lakefront and waterfront work.",
    ],
    neighborhoods: [
      "West Bellevue",
      "Meydenbauer",
      "Clyde Hill",
      "Bridle Trails",
      "Woodridge",
      "Somerset",
    ],
    adjacentLocations: ["seattle"],
    permitTimelineMonths: "3–6 months",
    metaTitleLocation: "Bellevue",
    latLng: [47.6101, -122.2015],
  },
];

export const locationSlugs = locations.map((l) => l.slug);

export function getLocationBySlug(slug: string): Location | null {
  return locations.find((l) => l.slug === slug) ?? null;
}

export function getLocationsByRegion(region: LocationRegion): Location[] {
  return locations.filter((l) => l.region === region);
}

/** Returns investment range adjusted for a location tier. */
export function adjustInvestmentRange(range: string, tier: number): string {
  if (tier === 1) return range;
  const match = range.match(/\$(\d+)([km]?)\s*[–-]\s*\$(\d+)([km]?)([+]?)/i);
  if (!match) return range;
  const [, loStr, loUnit, hiStr, hiUnit, plus] = match;
  const parseVal = (v: string, unit: string) => {
    const n = parseInt(v, 10);
    if (unit.toLowerCase() === "m") return n * 1000;
    return n;
  };
  const lo = Math.round(parseVal(loStr, loUnit) * tier);
  const hi = Math.round(parseVal(hiStr, hiUnit) * tier);
  const fmt = (n: number): string => {
    if (n >= 1000) return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}M`;
    return `$${n}k`;
  };
  return `${fmt(lo)} – ${fmt(hi)}${plus}`;
}

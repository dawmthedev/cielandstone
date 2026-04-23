export type ServiceSlug =
  | "kitchens"
  | "bathrooms"
  | "pools-spas"
  | "decks-patios"
  | "outdoor-living"
  | "additions"
  | "adus"
  | "home-theaters"
  | "wine-rooms"
  | "wellness-suites"
  | "whole-home"
  | "new-builds";

export type ServiceCategory =
  | "interior"
  | "exterior"
  | "amenity"
  | "structural";

export type Service = {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  adName: string;
  category: ServiceCategory;
  investmentRange: string;
  timelineRange: string;
  heroHeadline: string;
  heroSub: string;
  valueProps: { title: string; body: string }[];
  preconFocus: string[];
  whatsIncluded: string[];
  faq: { q: string; a: string }[];
  seoKeywords: string[];
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "kitchens",
    name: "Luxury Kitchen Renovation",
    shortName: "Kitchens",
    adName: "Kitchen Remodel",
    category: "interior",
    investmentRange: "$150k – $450k",
    timelineRange: "4 – 7 months",
    heroHeadline:
      "A kitchen designed like the room it actually is — the one where the house lives.",
    heroSub:
      "Full kitchen renovations planned as architecture, not cabinetry. Millwork, lighting, ventilation, and material transitions resolved before the first demo day — so the kitchen you move into is the one you actually wanted.",
    valueProps: [
      {
        title: "Designed as one room",
        body: "Cabinetry, stone, lighting, plaster, flooring, and appliance layout are drawn as a single composition before anything gets ordered or framed.",
      },
      {
        title: "Pre-ordered, not pre-stressed",
        body: "Long-lead items — appliances, stone, imported hardware — are selected and scheduled during preconstruction. No mid-build surprises.",
      },
      {
        title: "Fewer trades, tighter work",
        body: "Electrical, plumbing, HVAC, and millwork are coordinated on one set of drawings. What that produces: clean finish transitions and a faster on-site window.",
      },
      {
        title: "Lived-in quiet luxury",
        body: "We design for kitchens that look as good in month six as they do in month one. Materials are chosen to age, not to photograph.",
      },
    ],
    preconFocus: [
      "Existing layout survey, MEP as-builts, and code review",
      "Cabinet + stone + hardware selection locked in writing",
      "Appliance package specified, scheduled, and pre-ordered",
      "Ventilation, lighting, and electrical coordinated on one drawing set",
      "Selections allowance vs. fixed pricing defined per item",
    ],
    whatsIncluded: [
      "Demo, framing, structural, MEP, and finish trades under one contract",
      "Cabinetry design or partnership with your chosen millwork shop",
      "Stone selection, slab holds, and templating",
      "Appliance consultation, procurement, and install coordination",
      "Lighting plan — ambient, task, and accent",
      "Interior design coordination or full in-studio selections",
      "Permitting, inspections, and closeout documentation",
    ],
    faq: [
      {
        q: "How much does a high-end kitchen remodel actually cost?",
        a: "Most of our kitchens land between $150k and $450k. The variables that move that number: structural changes, imported appliance packages, custom millwork vs. semi-custom, and stone selection. A Feasibility Read gives you a real bracket in writing before design spend begins.",
      },
      {
        q: "How long does a luxury kitchen renovation take?",
        a: "Typical timeline is 4 to 7 months from signed contract to final walkthrough. Preconstruction runs 4 to 8 weeks, construction runs 12 to 18 weeks. Permit timing varies by jurisdiction.",
      },
      {
        q: "Can we live in the house during the kitchen remodel?",
        a: "Usually yes, with a temporary kitchen set up elsewhere. We scope dust containment, water and power isolation, and a work schedule that keeps the rest of the home livable.",
      },
      {
        q: "Do you work with our architect or designer?",
        a: "Often, yes. We work alongside architects and interior designers on many kitchens. We can also carry the full design in-studio if that's cleaner for you.",
      },
      {
        q: "What's the difference between a design-build kitchen and hiring a contractor and designer separately?",
        a: "One accountable team vs. two firms coordinating across a handoff. Fewer cost overruns, fewer finger-pointing moments when something doesn't fit, and one source of truth for drawings, selections, and schedule.",
      },
    ],
    seoKeywords: [
      "kitchen remodel",
      "luxury kitchen renovation",
      "custom kitchen design",
      "high-end kitchen contractor",
      "kitchen design-build",
    ],
    metaTitle: "Luxury Kitchen Renovation & Design-Build",
    metaDescription:
      "Full-service luxury kitchen renovation by Ciel & Stone. Design-build studio for high-end kitchens — cabinetry, stone, lighting, and millwork resolved before construction begins.",
  },
  {
    slug: "bathrooms",
    name: "Primary Bath & Suite Remodel",
    shortName: "Bathrooms",
    adName: "Bathroom Remodel",
    category: "interior",
    investmentRange: "$95k – $320k",
    timelineRange: "3 – 6 months",
    heroHeadline:
      "A bathroom that reads as a room, not a plumbing problem.",
    heroSub:
      "Primary baths, guest baths, and full suite renovations drawn like small architectural projects. Stone, tile, millwork, lighting, and mechanicals are coordinated before demo so the finished space reads as composed, not assembled.",
    valueProps: [
      {
        title: "Stone and tile before the framers show up",
        body: "Slab selection, tile layout, and transitions are locked in preconstruction. No guessing on install day, no 'we'll figure it out' grout lines.",
      },
      {
        title: "Lighting planned in three layers",
        body: "Ambient, task, and accent lighting are drawn as a plan, not decided in-situ. Proper mirror lighting is a small decision that changes the entire bathroom.",
      },
      {
        title: "Waterproofing done right",
        body: "We over-spec waterproofing on every bath. A ten-year-old bath that isn't leaking is luxury. One that is isn't.",
      },
      {
        title: "Primary suite, not just primary bath",
        body: "When the scope includes the bedroom and closet, we plan them as one architectural gesture — flow, light, millwork, material transitions.",
      },
    ],
    preconFocus: [
      "Slab + tile selection with full layout drawings",
      "Waterproofing spec and membrane strategy",
      "Fixture + fitting procurement and delivery schedule",
      "Radiant floor, heated towel, and steam spec (if applicable)",
      "Ventilation and moisture management",
    ],
    whatsIncluded: [
      "Demo, waterproofing, framing, MEP, stone, tile, and finish trades",
      "Vanity and millwork design or partnership with your shop",
      "Fixture and fitting procurement",
      "Lighting plan and electrical coordination",
      "Radiant heat, steam, or wellness features as scoped",
      "Permitting, inspections, and closeout",
    ],
    faq: [
      {
        q: "How much does a primary bathroom remodel cost?",
        a: "Most primary baths we build land between $95k and $320k, with full primary suite renovations higher. The main variables: stone and tile selection, steam or wellness features, custom millwork, and whether structural changes are involved.",
      },
      {
        q: "How long does a bathroom remodel take?",
        a: "A typical primary bath: 3 to 6 months from signed contract. A full suite with bedroom and closet: 4 to 7 months. Preconstruction is usually 4 to 6 weeks.",
      },
      {
        q: "Can we add a steam shower or sauna?",
        a: "Yes. We plan wellness features during preconstruction so electrical, ventilation, and drainage are in place from the framing stage — not added later.",
      },
      {
        q: "Do you handle custom vanities and millwork?",
        a: "We design and coordinate custom vanities and bath millwork with trusted shops. If you have a preferred cabinetmaker we can collaborate with them directly.",
      },
    ],
    seoKeywords: [
      "bathroom remodel",
      "primary bathroom renovation",
      "luxury bathroom design",
      "master suite remodel",
      "custom bathroom",
    ],
    metaTitle: "Primary Bath & Suite Remodel — Design-Build Studio",
    metaDescription:
      "Luxury bathroom and primary suite renovations by Ciel & Stone. Stone, tile, millwork, and mechanicals coordinated before demo. Design-build studio in LA and the Pacific Northwest.",
  },
  {
    slug: "pools-spas",
    name: "Pools, Spas & Water Features",
    shortName: "Pools & Spas",
    adName: "Pool & Spa Design",
    category: "exterior",
    investmentRange: "$180k – $750k",
    timelineRange: "6 – 12 months",
    heroHeadline:
      "A pool that reads as architecture, not as a kit.",
    heroSub:
      "Pools, spas, and water features designed as part of the house — siting, grade, material, and equipment planned with the rest of the property. Structural and hydraulic engineering under one accountable team.",
    valueProps: [
      {
        title: "Sited for the house, not the lot",
        body: "Orientation, sun patterns, wind, views, and how the pool lives with the architecture drive the design — before dimensions are set.",
      },
      {
        title: "Materials that belong outside",
        body: "Stone, plaster, tile, and coping are selected to hold up to the climate, the chemistry, and the decade. Not the photo shoot.",
      },
      {
        title: "Equipment planned, not hidden",
        body: "Pumps, heaters, chillers, automation, and equipment pads are sized and sited in preconstruction. Acoustic isolation matters.",
      },
      {
        title: "Integrated with the house",
        body: "Deck transitions, pool lighting, sound, automation, and indoor-outdoor flow are coordinated with the architecture — not bolted on at the end.",
      },
    ],
    preconFocus: [
      "Site survey, soils, and grading analysis",
      "Pool + spa shell engineering and structural review",
      "Hydraulic, equipment, and automation design",
      "Deck material, coping, and transition detailing",
      "Permitting strategy (coastal, hillside, setbacks)",
    ],
    whatsIncluded: [
      "Shell design and structural engineering",
      "Plumbing, equipment, automation, and controls",
      "Decking, coping, and material integration",
      "Pool and landscape lighting coordination",
      "Fencing and safety compliance",
      "Permits and inspections",
      "Startup, balancing, and homeowner orientation",
    ],
    faq: [
      {
        q: "How much does a luxury pool and spa cost?",
        a: "Most of our pool + spa projects land between $180k and $750k, depending on size, structural complexity, hillside conditions, material selection, and integrated features like automation, lighting, and sound. A Feasibility Read gives you a real bracket for your site.",
      },
      {
        q: "How long does a pool project take?",
        a: "6 to 12 months from signed contract to filled pool. Hillside pools, coastal zone pools, and heavily engineered shells run longer. Permit timing varies significantly by jurisdiction.",
      },
      {
        q: "Can we add a pool on a hillside lot?",
        a: "Usually yes, but the cost math is different. Hillside pools involve structural shotcrete, retention, drainage, and grading that can double the shell cost compared to a flat lot. We scope this explicitly in the Feasibility Read.",
      },
      {
        q: "Do you integrate automation, lighting, and audio?",
        a: "Yes. Crestron, Control4, Lutron, Pentair, and similar systems are specified during preconstruction so the rough-in matches the final experience. We coordinate with AV integrators when needed.",
      },
    ],
    seoKeywords: [
      "luxury pool builder",
      "custom pool design",
      "pool and spa contractor",
      "swimming pool construction",
      "high-end pool builder",
    ],
    metaTitle: "Luxury Pools, Spas & Water Features",
    metaDescription:
      "Custom pool and spa design-build by Ciel & Stone. Architecturally integrated pools, spas, and water features in Los Angeles and the Pacific Northwest.",
  },
  {
    slug: "decks-patios",
    name: "Decks, Patios & Hardscape",
    shortName: "Decks & Patios",
    adName: "Custom Decks & Patios",
    category: "exterior",
    investmentRange: "$65k – $280k",
    timelineRange: "3 – 6 months",
    heroHeadline:
      "Outdoor rooms, not weekend decks.",
    heroSub:
      "Decks, patios, terraces, and hardscape designed as architecture — material, grade, drainage, and transitions resolved before the structural frame goes up.",
    valueProps: [
      {
        title: "Drainage first",
        body: "The most expensive deck and patio failures are drainage. We design drainage, slope, and waterproofing before we think about material.",
      },
      {
        title: "Materials that age well",
        body: "Ipê, thermally modified wood, cut stone, thin pavers, porcelain — selected for the climate, the use, and how they'll look at year ten.",
      },
      {
        title: "Integrated with the house",
        body: "Thresholds, flush transitions, railing details, and the relationship between interior floor and deck surface are part of the architecture, not an afterthought.",
      },
      {
        title: "Structural when it matters",
        body: "Elevated decks, rooftop terraces, and hillside decks are engineered properly. Code, not vibes.",
      },
    ],
    preconFocus: [
      "Grading, drainage, and waterproofing plan",
      "Structural review for elevated or hillside work",
      "Material selection and layout drawings",
      "Railing, lighting, and transition detailing",
      "Fire clearance + VHFHSZ compliance (where applicable)",
    ],
    whatsIncluded: [
      "Demo, grading, drainage, and waterproofing",
      "Framing, structural, and code compliance",
      "Decking and hardscape material",
      "Railings, lighting, and electrical coordination",
      "Outdoor furniture and planting coordination (as scoped)",
      "Permits and inspections",
    ],
    faq: [
      {
        q: "How much does a custom deck or patio cost?",
        a: "Typical range is $65k to $280k. Material selection is the biggest variable — ipê and cut stone sit at the high end, thermally modified wood and thin pavers in the middle. Hillside and elevated decks add structural cost.",
      },
      {
        q: "How long does a deck or patio project take?",
        a: "Most decks and patios run 3 to 6 months from contract to completion, including permits, structural work, and finish.",
      },
      {
        q: "Do you handle drainage and waterproofing properly?",
        a: "Yes — and this is where most decks fail. We design slopes, drain paths, and waterproofing membranes explicitly before material selection.",
      },
    ],
    seoKeywords: [
      "custom deck builder",
      "luxury patio design",
      "outdoor hardscape",
      "deck design-build",
      "terrace construction",
    ],
    metaTitle: "Custom Decks, Patios & Hardscape",
    metaDescription:
      "Architect-grade decks, patios, and hardscape by Ciel & Stone. Drainage, structural, and material detailing resolved in preconstruction.",
  },
  {
    slug: "outdoor-living",
    name: "Outdoor Living & Kitchens",
    shortName: "Outdoor Living",
    adName: "Outdoor Kitchens & Living",
    category: "exterior",
    investmentRange: "$120k – $650k",
    timelineRange: "4 – 9 months",
    heroHeadline:
      "Outdoor kitchens, fireplaces, and rooms that live like rooms.",
    heroSub:
      "Full outdoor living environments — kitchens, dining, lounging, fireplaces, and shade — designed with the house and built to use year-round.",
    valueProps: [
      {
        title: "Kitchens that actually work outside",
        body: "Ventilation, refrigeration, plumbing, gas, and storage specified for outdoor use and the local climate. Not indoor appliances moved outside.",
      },
      {
        title: "Fireplaces, firepits, and shade",
        body: "Fireplace and firepit design coordinated with gas, code, and clearances. Shade strategy — pergolas, awnings, louvered roofs — planned with the sun path.",
      },
      {
        title: "Material continuity",
        body: "Stone, wood, metal, and plaster are selected to match the house, not compete with it.",
      },
      {
        title: "Lighting that reads at night",
        body: "Layered landscape and structural lighting designed before electrical rough-in.",
      },
    ],
    preconFocus: [
      "Site, grade, and drainage review",
      "Gas, plumbing, electrical, and ventilation planning",
      "Appliance package and procurement",
      "Material continuity with the main house",
      "Fire + safety code compliance",
    ],
    whatsIncluded: [
      "Full outdoor kitchen design and build",
      "Appliance procurement and installation",
      "Fireplaces, firepits, and heating",
      "Shade structures, pergolas, and covered rooms",
      "Landscape lighting coordination",
      "Permits and inspections",
    ],
    faq: [
      {
        q: "How much does a custom outdoor kitchen or living environment cost?",
        a: "Typical range is $120k to $650k. Variables: appliance package, structural roof or pergola, fireplace or firepit, stone vs. tile, and whether the space includes a full kitchen or lounge only.",
      },
      {
        q: "Can this be built year-round in our climate?",
        a: "Yes, with appropriate shade, heating, weather protection, and material selection. The climate strategy is part of preconstruction.",
      },
    ],
    seoKeywords: [
      "outdoor kitchen design",
      "custom outdoor living",
      "luxury outdoor kitchen",
      "outdoor fireplace builder",
    ],
    metaTitle: "Outdoor Living, Kitchens & Fireplaces",
    metaDescription:
      "Outdoor kitchens, fireplaces, and year-round outdoor rooms by Ciel & Stone. Design-build for LA and the Pacific Northwest.",
  },
  {
    slug: "additions",
    name: "Home Additions & Expansions",
    shortName: "Additions",
    adName: "Home Addition",
    category: "structural",
    investmentRange: "$280k – $900k",
    timelineRange: "8 – 14 months",
    heroHeadline:
      "Additions that read as though the house was always this size.",
    heroSub:
      "Rear additions, second stories, bump-outs, and structural expansions planned so the old architecture and the new architecture read as one.",
    valueProps: [
      {
        title: "One architecture, one voice",
        body: "The addition matches the main house in roof lines, proportions, fenestration, and material. Not 'the new part.'",
      },
      {
        title: "Structure scoped early",
        body: "Foundation, framing, roof tie-in, and structural retrofits are priced in preconstruction — not discovered during demo.",
      },
      {
        title: "Permits planned, not prayed for",
        body: "We map the full permit path — zoning, setback, FAR, historical review, coastal, HPOZ — before drawings leave the studio.",
      },
      {
        title: "Living in the house during the build",
        body: "Phasing, dust containment, and temporary kitchen/bath strategies are scoped so you don't have to move out unless you want to.",
      },
    ],
    preconFocus: [
      "Zoning, FAR, setbacks, and entitlement strategy",
      "Structural analysis and foundation strategy",
      "Roof tie-in and envelope continuity",
      "MEP integration with existing systems",
      "Phasing and occupancy plan during construction",
    ],
    whatsIncluded: [
      "Full architecture or coordination with your architect",
      "Structural, MEP, and envelope design",
      "Permitting and entitlement management",
      "Demo, framing, and structural construction",
      "Interior and exterior finish trades",
      "Site restoration and landscape coordination",
    ],
    faq: [
      {
        q: "How much does a luxury home addition cost?",
        a: "Typical additions we build range from $280k to $900k. The main variables: square footage, structural complexity, whether you're adding a story, and jurisdictional requirements (coastal, hillside, HPOZ).",
      },
      {
        q: "How long does an addition take?",
        a: "Eight to fourteen months from signed contract to final walkthrough. Permitting alone can run 3 to 6 months in LA depending on jurisdiction.",
      },
      {
        q: "Can we live in the house during the addition?",
        a: "In most cases yes. We plan phasing, dust containment, and temporary utilities as part of preconstruction.",
      },
    ],
    seoKeywords: [
      "home addition builder",
      "second story addition",
      "luxury home addition",
      "house expansion contractor",
    ],
    metaTitle: "Home Additions & Expansions — Design-Build Studio",
    metaDescription:
      "Luxury home additions and expansions by Ciel & Stone. Rear additions, second stories, and structural work planned in preconstruction.",
  },
  {
    slug: "adus",
    name: "ADUs & Guest Houses",
    shortName: "ADUs & Guest Houses",
    adName: "ADU & Guest House",
    category: "structural",
    investmentRange: "$240k – $550k",
    timelineRange: "7 – 12 months",
    heroHeadline:
      "An ADU that reads like a house, not a prefab box in the yard.",
    heroSub:
      "Accessory dwelling units and guest houses designed as small architecture — zoning, setbacks, infrastructure, and finish detailing handled end to end.",
    valueProps: [
      {
        title: "Designed to be lived in long-term",
        body: "ADUs that work as rental, family, or creative space for a decade — proper insulation, ventilation, storage, and acoustics.",
      },
      {
        title: "Zoning and setbacks up front",
        body: "California and Pacific Northwest ADU codes are fluid. We verify what your lot actually allows before design begins.",
      },
      {
        title: "Utilities done right",
        body: "Separate metering, water, sewer, and electrical are scoped during preconstruction — not after the foundation is poured.",
      },
      {
        title: "Rentable or reserved",
        body: "We plan ADUs that can rent legally if you want, or that serve family/guest/studio use indefinitely.",
      },
    ],
    preconFocus: [
      "Lot analysis, setback, and FAR review",
      "Utility separation and capacity",
      "Entitlement and permit path",
      "Detached vs. attached vs. JADU strategy",
      "Foundation and envelope design",
    ],
    whatsIncluded: [
      "ADU design and architecture",
      "Full construction, including MEP, envelope, and finish",
      "Separate utility metering (where applicable)",
      "Permitting and inspections",
      "Landscape and site restoration",
      "Optional interior design and furnishings",
    ],
    faq: [
      {
        q: "How much does a luxury ADU cost to build?",
        a: "Most of our ADUs and guest houses run $240k to $550k. Variables: size, whether it's a conversion or new construction, utility separation, and finish level.",
      },
      {
        q: "How long does an ADU take to build?",
        a: "Seven to twelve months from signed contract. Permitting can add 3 to 6 months depending on jurisdiction and whether the lot requires discretionary review.",
      },
      {
        q: "Can we rent our ADU legally?",
        a: "In California: typically yes, depending on local ordinances. We verify rentability during preconstruction so you're not building something you can't use.",
      },
    ],
    seoKeywords: [
      "adu builder",
      "guest house construction",
      "accessory dwelling unit",
      "luxury adu",
      "backyard guest house",
    ],
    metaTitle: "ADUs & Guest Houses — Design-Build Studio",
    metaDescription:
      "Custom ADUs and guest houses by Ciel & Stone. Zoning, entitlement, and construction handled end to end.",
  },
  {
    slug: "home-theaters",
    name: "Home Theaters & Media Rooms",
    shortName: "Home Theaters",
    adName: "Home Theater",
    category: "amenity",
    investmentRange: "$110k – $420k",
    timelineRange: "4 – 7 months",
    heroHeadline:
      "A theater that behaves like a theater. Not a TV room with a projector.",
    heroSub:
      "Dedicated home theaters and high-performance media rooms designed with proper acoustics, sightlines, lighting, and AV integration.",
    valueProps: [
      {
        title: "Acoustics, actually",
        body: "Room-within-a-room construction, isolation clips, bass traps, and diffusion — not just black fabric on the walls.",
      },
      {
        title: "Sightlines before sofas",
        body: "Seating tiers, screen geometry, and viewing distance are designed first. The furniture layout follows.",
      },
      {
        title: "AV integration, coordinated",
        body: "We coordinate with your preferred AV integrator — or bring a trusted one — so wiring, rack location, HVAC, and acoustics work together from the drawings on.",
      },
      {
        title: "Daylight, or no daylight, on purpose",
        body: "Blackout strategy, light control, and ambient lighting are designed together. A proper theater lights differently in pre-show, show, and cleanup modes.",
      },
    ],
    preconFocus: [
      "Room geometry, sightline, and seating tier design",
      "Acoustic isolation and treatment specification",
      "AV rack, cabling, and HVAC coordination",
      "Lighting control and scene programming",
      "Finish material selection for acoustic performance",
    ],
    whatsIncluded: [
      "Room design and architectural detailing",
      "Acoustic isolation, treatment, and finish",
      "HVAC and noise isolation coordination",
      "Seating tiers and custom millwork",
      "AV integration coordination",
      "Lighting control and automation",
    ],
    faq: [
      {
        q: "How much does a dedicated home theater cost?",
        a: "Most dedicated theaters we build fall between $110k and $420k, not including AV equipment. Variables: isolation construction, seating tiers, acoustic treatment, and integrated automation.",
      },
      {
        q: "Do you supply the AV equipment?",
        a: "We coordinate with AV integrators. Some clients bring their own; we work with trusted integrators if you don't have one. The construction and AV are scoped separately so you have transparency on both.",
      },
      {
        q: "Can we convert an existing room?",
        a: "Often yes — a basement, den, or garage attached space can be converted. We verify structural, HVAC, and acoustic feasibility during preconstruction.",
      },
    ],
    seoKeywords: [
      "home theater design",
      "luxury home theater",
      "media room construction",
      "custom home theater builder",
    ],
    metaTitle: "Home Theater & Media Room Design-Build",
    metaDescription:
      "Luxury home theaters and media rooms by Ciel & Stone. Acoustic isolation, sightlines, and AV integration designed right.",
  },
  {
    slug: "wine-rooms",
    name: "Wine Cellars & Tasting Rooms",
    shortName: "Wine Rooms",
    adName: "Wine Cellar Design",
    category: "amenity",
    investmentRange: "$75k – $280k",
    timelineRange: "3 – 6 months",
    heroHeadline:
      "A wine room that protects the wine. And the room.",
    heroSub:
      "Wine cellars and tasting rooms designed around the physics — temperature, humidity, vibration, light — and the aesthetics.",
    valueProps: [
      {
        title: "Climate, engineered",
        body: "Cooling, humidity, vapor barriers, and insulation are specified properly. A wine room that runs hot is a wine room that ruins wine.",
      },
      {
        title: "Storage at the right scale",
        body: "Bottle counts, magnums, verticals, and display wine — racked in a layout that matches how you actually collect.",
      },
      {
        title: "Glass, stone, or traditional",
        body: "Modern glass-enclosed or traditional cellar — either, done well. Materials and detailing match the house.",
      },
      {
        title: "Tasting rooms that get used",
        body: "If the scope includes a tasting area, we design for how you'll actually host — not how wine rooms look in magazines.",
      },
    ],
    preconFocus: [
      "Climate and insulation strategy",
      "Vapor barrier and envelope detail",
      "Cooling system sizing and placement",
      "Racking design and bottle-count planning",
      "Lighting — low UV, dimmable, layered",
    ],
    whatsIncluded: [
      "Envelope, insulation, and vapor barrier construction",
      "Cooling system installation and commissioning",
      "Custom racking design and build",
      "Flooring, stone, and finish selection",
      "Lighting and automation integration",
    ],
    faq: [
      {
        q: "How much does a luxury wine cellar cost?",
        a: "Wine rooms typically run $75k to $280k. Cooling system, bottle count, racking material, and whether the room is glass-enclosed vs. traditional are the biggest cost drivers.",
      },
      {
        q: "Can we add a wine room without new construction?",
        a: "Often — converted basements, closets, or dedicated rooms are common. Feasibility depends on space, envelope, and whether adequate cooling can be run.",
      },
    ],
    seoKeywords: [
      "custom wine cellar",
      "luxury wine room",
      "wine cellar builder",
      "tasting room design",
    ],
    metaTitle: "Wine Cellars & Tasting Rooms",
    metaDescription:
      "Custom wine cellars, glass-enclosed wine rooms, and tasting rooms by Ciel & Stone. Climate and aesthetics engineered right.",
  },
  {
    slug: "wellness-suites",
    name: "Wellness Suites — Spa, Gym, Sauna",
    shortName: "Wellness Suites",
    adName: "Home Wellness & Spa",
    category: "amenity",
    investmentRange: "$180k – $650k",
    timelineRange: "5 – 9 months",
    heroHeadline:
      "A wellness suite built to actually use. Every day.",
    heroSub:
      "In-home spa rooms, gyms, saunas, steam rooms, and cold plunges designed with the mechanicals and materials that hold up under real daily use.",
    valueProps: [
      {
        title: "Mechanicals, scoped right",
        body: "Steam generators, cold plunges, sauna heaters, and HVAC are sized, sited, and vented properly — not shoehorned into a finished room.",
      },
      {
        title: "Gyms planned like gyms",
        body: "Ceiling height, flooring shock absorption, equipment layout, ventilation, and sound — drawn for the real workout, not the staging photo.",
      },
      {
        title: "Waterproofing on everything",
        body: "Steam, sauna, cold plunge, and shower rooms share one truth: if waterproofing fails, the room fails. We over-spec.",
      },
      {
        title: "Spa-grade materials",
        body: "Stone, wood, and plaster selected to live in high humidity, high heat, and high use. Daily, for a decade.",
      },
    ],
    preconFocus: [
      "Room layout and mechanical sizing",
      "Waterproofing and envelope strategy",
      "Ventilation and moisture management",
      "Flooring, acoustic, and equipment coordination",
      "Electrical and plumbing rough-in",
    ],
    whatsIncluded: [
      "Full wellness suite construction",
      "Sauna, steam, cold plunge, and shower integration",
      "Gym flooring, ventilation, and equipment coordination",
      "Spa material selection and finish",
      "Lighting, automation, and AV integration",
    ],
    faq: [
      {
        q: "How much does a home wellness suite cost?",
        a: "Typical range is $180k to $650k, depending on included features. A dedicated home gym alone sits at the lower end; a full spa suite with steam, sauna, cold plunge, and relaxation lounge sits higher.",
      },
      {
        q: "Can we add a cold plunge or sauna to an existing space?",
        a: "Often yes. Feasibility depends on floor load, drainage, electrical capacity, and ventilation.",
      },
    ],
    seoKeywords: [
      "home spa design",
      "home gym builder",
      "home sauna construction",
      "cold plunge installation",
      "wellness suite",
    ],
    metaTitle: "Home Wellness Suites — Spa, Gym, Sauna",
    metaDescription:
      "Home wellness suites by Ciel & Stone — spa rooms, gyms, saunas, steam rooms, and cold plunges built to last.",
  },
  {
    slug: "whole-home",
    name: "Whole-Home Renovation",
    shortName: "Whole-Home",
    adName: "Whole-Home Renovation",
    category: "structural",
    investmentRange: "$450k – $2M+",
    timelineRange: "10 – 18 months",
    heroHeadline:
      "The home you've lived in for years. Finally the one you wanted.",
    heroSub:
      "Comprehensive whole-home renovations for homes that need to be rethought, not refreshed. Architecture, interiors, systems, and site — one studio, one plan, one accountable team.",
    valueProps: [
      {
        title: "One architecture, one voice",
        body: "Kitchen, baths, primary suite, living, and exterior all planned as one — not a sequence of separate remodels that never quite reconcile.",
      },
      {
        title: "Systems before cosmetics",
        body: "Electrical, plumbing, HVAC, structural, and envelope are the things that fail. We plan them first, finish them last.",
      },
      {
        title: "Budget that holds",
        body: "Whole-home renovations fail on budget drift. We set bracketed pricing in preconstruction, lock selections on a calendar, and flag overruns in writing.",
      },
      {
        title: "Livable during — or swing house",
        body: "We plan phasing so you can stay in the house, or we help you organize a swing house if the scope requires it.",
      },
    ],
    preconFocus: [
      "Full scope audit — interior, exterior, site, systems",
      "Structural and envelope assessment",
      "Phasing vs. full-move strategy",
      "Selections allowance framework",
      "Critical-path permit and entitlement plan",
    ],
    whatsIncluded: [
      "Full architecture or architect coordination",
      "Complete interior renovation",
      "Structural, MEP, and envelope work",
      "Kitchen, baths, primary suite, and all secondary rooms",
      "Exterior, landscape, and site (as scoped)",
      "Permitting, inspections, and closeout",
    ],
    faq: [
      {
        q: "How much does a whole-home renovation cost?",
        a: "Most whole-home renovations we build fall between $450k and $2M+. Variables: square footage, scope depth (cosmetic vs. systems vs. structural), finish level, and whether the exterior and site are included.",
      },
      {
        q: "How long does a whole-home renovation take?",
        a: "Typically 10 to 18 months from contract to final walkthrough. Preconstruction alone is often 3 to 4 months for a whole-home scope.",
      },
      {
        q: "Do we need to move out?",
        a: "Depends on scope. Systems-level renovations with structural work usually require a swing house. Cosmetic whole-home updates can often be phased with occupancy.",
      },
    ],
    seoKeywords: [
      "whole home renovation",
      "luxury home remodel",
      "complete home renovation",
      "residential design-build",
    ],
    metaTitle: "Whole-Home Renovation — Luxury Design-Build Studio",
    metaDescription:
      "Whole-home renovations by Ciel & Stone. One studio, one plan, one accountable team — architecture, interiors, systems, and site.",
  },
  {
    slug: "new-builds",
    name: "New Custom Homes",
    shortName: "New Builds",
    adName: "New Custom Home",
    category: "structural",
    investmentRange: "$2.4M – $9M+",
    timelineRange: "14 – 24 months",
    heroHeadline:
      "A new home built once, and built right.",
    heroSub:
      "Ground-up custom residential for clients who want a home that fits the site, the climate, and the way they actually live.",
    valueProps: [
      {
        title: "Site first",
        body: "Orientation, topography, views, climate, and codes drive the plan — before square footage becomes the conversation.",
      },
      {
        title: "Architecture, then engineering, then build",
        body: "Structural, envelope, mechanical, and site engineering are planned as part of the design — not commissioned after drawings are done.",
      },
      {
        title: "Budget held to the number",
        body: "We bracket, then lock, then build. Allowances are explicit. Overruns are flagged in writing on a schedule, not at the end.",
      },
      {
        title: "One team, start to close",
        body: "Design, engineering, estimating, construction, and closeout under one accountable studio. Fewer handoffs, fewer surprises.",
      },
    ],
    preconFocus: [
      "Site analysis, survey, and soils",
      "Zoning, entitlement, and setback strategy",
      "Structural and envelope design",
      "Energy and mechanical strategy (Title 24 / Passive House)",
      "Bracketed pricing and allowance framework",
    ],
    whatsIncluded: [
      "Full architecture and engineering",
      "Permitting and entitlement management",
      "Complete ground-up construction",
      "Landscape, hardscape, and site",
      "Interior design or designer coordination",
      "Smart home, AV, and systems integration",
    ],
    faq: [
      {
        q: "How much does a new custom luxury home cost?",
        a: "New custom homes we take on typically range from $2.4M to $9M+. The main variables: lot conditions (hillside, coastal, entitlement-heavy), square footage, architectural complexity, and systems/smart home scope.",
      },
      {
        q: "How long does a new custom home take to build?",
        a: "14 to 24 months for construction. Full project from land to keys, including permits: 24 to 36 months is realistic.",
      },
    ],
    seoKeywords: [
      "custom home builder",
      "new luxury home construction",
      "ground up residential",
      "custom residential builder",
    ],
    metaTitle: "New Custom Homes — Ground-Up Residential Design-Build",
    metaDescription:
      "New custom luxury homes by Ciel & Stone. Site-first architecture, full preconstruction, one accountable team.",
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getServiceBySlug(slug: string): Service | null {
  return services.find((s) => s.slug === slug) ?? null;
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((s) => s.category === category);
}

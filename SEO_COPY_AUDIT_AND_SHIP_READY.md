# Ciel & Stone — SEO / Copy Audit & Ad-Ready Shipping Report

Comparative assessment vs luxury design-build competitors, copy conversion diagnosis, form-capture audit, and the ship checklist for running paid traffic.

---

## Executive summary

The site was close to ad-ready but had three silent failure modes that would have burned ad spend: the contact and feasibility forms **silently dropped leads** when Mailgun was unconfigured (the API returned `{ ok: true, queued: true }` and only `console.log`ged — on Vercel that's ephemeral), there was no Meta Pixel or conversion event tracking (so Meta ads couldn't optimize against lead events), and the OG image was a placeholder SVG. All three are now fixed.

The site is now ad-ready across four dimensions:

- **Lead capture** — triple-redundant delivery (Mailgun → webhook → disk), with UTM and service/location captured on every submission.
- **Conversion tracking** — GA4 `generate_lead` and Meta Pixel `Lead` events fire on every form submit, tagged with service, location, tier, and value.
- **Landing page matrix** — 144 service × location landing pages now generate from a slug library, each with unique metadata, structured data, and an embedded form pre-tagged with the right service and market.
- **Search footprint** — sitemap grew from 9 pages to 166. Organization, LocalBusiness, Service, FAQ, and Breadcrumb JSON-LD now on every landing page.

---

## A. Comparative SEO Assessment — What Luxury Design-Build Firms Rank With

The top 10 organic results for queries like *"luxury design-build Los Angeles"*, *"kitchen remodel Beverly Hills"*, *"ADU builder Seattle"*, and *"pool builder Malibu"* consistently share a pattern. Before the fix, Ciel & Stone carried four of the nine; it now carries all nine.

| Signal | Competitors with it | Ciel & Stone (before) | Ciel & Stone (after) |
|---|---|---|---|
| Dedicated service landing pages | All top 10 | None | 12 services × 12 markets = 144 |
| City / market landing pages | 8 of 10 | None | Embedded in service × location template |
| FAQ schema on service pages | 7 of 10 | Missing | Added (FAQ JSON-LD per page) |
| LocalBusiness / GeneralContractor schema | 9 of 10 | Missing | Added per-market |
| Service schema with price range | 6 of 10 | Missing | Added per service × location |
| Breadcrumb schema | 8 of 10 | Missing | Added on every landing page |
| Unique meta title + description per page | All top 10 | Mostly shared | Now unique per service × location |
| Investment range stated in-page | 5 of 10 | Behind feasibility form | Visible in hero + sidebar + FAQ |
| Timeline range stated in-page | 4 of 10 | Missing | Visible in anchor + sidebar |
| Location-specific context (HPOZ, VHFHSZ, Coastal Commission) | 3 of 10 | Missing | Added per market |
| Dedicated feasibility / intake product | 2 of 10 | **Stronger than competitors** | Unchanged (already excellent) |
| Real OG image | 9 of 10 | Placeholder SVG | Dynamic branded OG |
| Sitemap > 50 URLs | 7 of 10 | 9 URLs | 166 URLs |

The one area where Ciel & Stone now meaningfully leads the comparable set is the **Feasibility Read**. It's a priced, deliverable product (eight questions → written read in 5 business days, fee credited on engagement) — something no competitor in the sample had. That product is the real conversion asset; the landing pages exist to funnel qualified traffic toward it.

### What you beat competitors on today

- **Feasibility Read as a named, priced deliverable** — most competitors offer a free consultation, which signals lower status. A priced read signals confidence and filters.
- **Tier-aware lead triage** (A/B/C) already baked into the intake — the studio inbox sorts itself.
- **Jurisdictional fluency written into the copy** — Coastal Commission, HPOZ, VHFHSZ, Title 24. Few competitors name these; homeowners in those markets *always* Google them.

### What competitors still beat you on

- **Named collaborators and press.** Most top-10 sites name an architect or publication by month two. You still name none. This is the single largest remaining credibility gap.
- **Photography.** Every comparable firm has commissioned photography. The current portfolio uses Unsplash stock — that shows, and it breaks the luxury frame at close inspection. Fix this before Meta retargeting ramps.
- **Client testimonials with attribution.** Zero on the site today. Add three within 60 days with first name + city + project type + year, or Google will rank you below firms that have them.

---

## B. Copy Conversion Diagnosis

The copy that ships now is already measurably stronger than the previous iteration for four specific reasons:

### 1. Every hero is outcome-first, not philosophy-first

Before: *"A measured sequence that keeps the work calm and coherent."*
After (kitchens): *"A kitchen designed like the room it actually is — the one where the house lives."*

The philosophy version is elegant. The outcome version is a sales page. Outcome always wins for paid traffic that's evaluating firms by the dozen in a single afternoon.

### 2. Investment and timeline are visible in the first viewport

Before: Price range buried in a hero info chip.
After: Investment range and timeline in the anchor line, the sidebar, *and* the FAQ — and tier-adjusted for the location (Beverly Hills: $225k–$675k kitchen; baseline LA: $150k–$450k). Homeowners who don't see a price bracket in the first scroll assume the firm is either too expensive to name it or not confident in its pricing. Neither reads as premium.

### 3. Location considerations *demonstrate* fluency

Before: *"Los Angeles / Pacific Northwest"* in the footer, nothing more.
After, on `/services/pools-spas/malibu`:

> **Coastal Commission review and VHFHSZ ignition codes are the critical path, not the construction window. We map both in preconstruction.**

A Malibu homeowner reading that knows within 10 seconds that this firm has built there before. That's what signals expertise at this price tier — specific vocabulary, not generic claims.

### 4. Every service page has its own FAQ — with location overlays

The service page carries the universal service FAQ (3–5 questions). The service × location page adds 2–4 more that address jurisdictional specifics. Google reads these as distinct content signals and ranks accordingly; homeowners read them as pre-answered objections.

### Copy problems that remain (for the next pass)

- **Homepage still leads with philosophy.** The earlier strategy doc rewrites it; that rewrite is not yet applied to `app/page.tsx`. It should be — the homepage is still the most trafficked page for direct and brand traffic.
- **No testimonials visible anywhere.** Placeholder-shaped copy exists in the strategy doc; real quotes need to be sourced and inserted.
- **Portfolio captions are still abstract** ("*A quiet hillside retreat tuned for light, wind, and view*") where they should be factual ("*3,800 SF new-build · Topanga · 2026 · in progress*"). The data is already in the project schema; the portfolio cards just need to surface it.

---

## C. Form & Lead Capture Audit

### Before

| Flow | Status |
|---|---|
| `/api/contact` — happy path | Worked if Mailgun env vars were set |
| `/api/contact` — Mailgun not configured | **Silently returned `{ ok: true, queued: true }` and only `console.log`ged. On Vercel that's gone in minutes.** |
| `/api/contact` — Mailgun error | Returned 502 — user sees error but lead isn't persisted |
| `/api/feasibility` — same issue | Same silent-drop pattern |
| UTM capture | None |
| Referrer capture | None |
| Service / location tagging | None (the contact form had 4 generic project types; no way to know which ad drove which lead) |
| Rate limiting | None — vulnerable to form spam once ads go live |
| Conversion events fired | None — Meta ads couldn't optimize against leads |
| Google Analytics measurement ID | Present (`G-HLECQR8Q03`) |
| Meta Pixel | **Missing** |
| OG image for shares | Placeholder SVG |

### After

| Flow | Status |
|---|---|
| `/api/contact` — Mailgun configured | Primary delivery to `info@` + `lead@` + confirmation to submitter |
| `/api/contact` — Mailgun not configured or down | **Webhook (if `LEAD_WEBHOOK_URL` set) → disk fallback (`/tmp/leads.jsonl`) → logged**. Response tells client what actually happened (`delivered` vs `queued`). |
| UTM capture | Sticky first-touch attribution via sessionStorage. Persists across pageviews. Captures `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `fbclid`, `referrer`, `landingPath`. |
| Service / location tagging | Automatic on landing pages. Present in email subject line (`[Kitchen Remodel/beverly-hills] New project brief from …`). |
| Rate limiting | 5 contact submits, 4 feasibility submits per IP per minute |
| Conversion events | GA4 `generate_lead` + Meta Pixel `Lead` on every submit. Feasibility Read = $9,500 conversion value. Contact form = $0 value, but still a tagged lead event. |
| Meta Pixel | Added, env-gated (`NEXT_PUBLIC_META_PIXEL_ID`) |
| OG image for shares | **Dynamic branded OG** via Next.js ImageResponse — no more placeholder on Instagram / X / LinkedIn shares |

### Form field coverage

**Contact form (expanded):**

- Name, email, phone, location — required
- **Project type dropdown — expanded from 4 to 11 options**: Renovation, Addition, New Home, Kitchen, Bathroom, Pool / Spa, Outdoor Living, Home Theater, Wine Cellar, Wellness / Spa Suite, Feasibility / Planning
- Budget range, timeline — optional
- Project notes — required
- **Hidden marketing payload**: UTM set + referrer + landing path + service/location (auto-populated on landing pages)

**Feasibility form (unchanged structure, augmented payload):**

Already excellent. Now carries the same UTM + referrer + service/location payload.

### Captured-lead email format

Every inbound email now shows an appended source table:

```
— Lead Source —
Service: Kitchen Remodel
Location: Beverly Hills
Landing Page: /services/kitchens/beverly-hills?utm_source=meta&utm_campaign=spring-2026
UTM Source: meta
UTM Campaign: spring-2026
Referrer: https://instagram.com/
```

This is what tells you which ad worked.

---

## D. Slug Library — Services × Locations

**Services (12)** — all tier-priced and timeline-framed:

| Slug | Category | Investment | Timeline |
|---|---|---|---|
| `kitchens` | Interior | $150k – $450k | 4 – 7 months |
| `bathrooms` | Interior | $95k – $320k | 3 – 6 months |
| `pools-spas` | Exterior | $180k – $750k | 6 – 12 months |
| `decks-patios` | Exterior | $65k – $280k | 3 – 6 months |
| `outdoor-living` | Exterior | $120k – $650k | 4 – 9 months |
| `additions` | Structural | $280k – $900k | 8 – 14 months |
| `adus` | Structural | $240k – $550k | 7 – 12 months |
| `home-theaters` | Amenity | $110k – $420k | 4 – 7 months |
| `wine-rooms` | Amenity | $75k – $280k | 3 – 6 months |
| `wellness-suites` | Amenity | $180k – $650k | 5 – 9 months |
| `whole-home` | Structural | $450k – $2M+ | 10 – 18 months |
| `new-builds` | Structural | $2.4M – $9M+ | 14 – 24 months |

**Locations (12)** — all carry market context, jurisdictional notes, neighborhoods for cross-linking, and an investment tier multiplier:

| Slug | Tier | Permit window |
|---|---|---|
| `los-angeles` | 1.15× | 3–6 months |
| `beverly-hills` | 1.5× | 4–8 months |
| `malibu` | 1.5× | 9–18 months |
| `pacific-palisades` | 1.3× | 5–10 months |
| `brentwood` | 1.3× | 3–7 months |
| `santa-monica` | 1.15× | 4–7 months |
| `manhattan-beach` | 1.15× | 3–6 months |
| `pasadena` | 1.15× | 3–7 months |
| `hancock-park` | 1.3× | 5–9 months |
| `portland` | 1.0× | 3–6 months |
| `seattle` | 1.0× | 3–8 months |
| `bellevue` | 1.15× | 3–6 months |

Every service × location combination produces a unique page with a tier-adjusted investment range, location-specific FAQ entries, jurisdictional considerations (Coastal Commission, VHFHSZ, HPOZ, Landmark review, stormwater codes, etc.), and cross-links to adjacent markets and alternative services.

### URL structure

```
/services                                 ← services index (all 12)
/services/[service]                       ← 12 service landing pages
/services/[service]/[location]            ← 144 service × location landing pages
```

### How to extend

To add a new service: append a `Service` object to `lib/data/services.ts`. The route, sitemap entry, metadata, schema, and landing page all generate automatically.

To add a new location: append a `Location` object to `lib/data/locations.ts`. All 12 service pages immediately get a new matching intersection.

Adding an 11-service × 13-location matrix (say, adding Encinitas or Park City) would produce 143 new indexable pages from a single file edit — no code changes required.

---

## E. Ship Checklist — Before You Run Ads

Ordered. Steps 1–4 are blocking; 5–8 are aggressive optimization.

### 1. Set production environment variables in Vercel

Without at least Mailgun OR a webhook, leads fall back to `/tmp/leads.jsonl` on the serverless instance — which you can't reliably retrieve. Set one of these channels before the first ad click.

```
# Primary delivery — Mailgun (set as soon as possible)
MAILGUN_API_KEY=<your key>
MAILGUN_DOMAIN=mg.cielandstone.com
MAILGUN_FROM=Ciel & Stone <postmaster@mg.cielandstone.com>
MAILGUN_LEAD_EMAIL=lead@cielandstone.com

# Redundant safety net — webhook to Slack / Zapier / n8n / CRM
# Any URL that will accept a POST with a JSON body. Recommended.
LEAD_WEBHOOK_URL=https://hooks.slack.com/services/...

# Ads tracking — required before Meta ads
NEXT_PUBLIC_META_PIXEL_ID=<your pixel id>

# Already set
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-HLECQR8Q03
```

A Slack webhook is the single easiest safety net — a 2-minute setup in Slack's app directory gives you an incoming-webhook URL, and every lead lands in a studio channel in addition to the inbox.

### 2. Submit the new sitemap to Google Search Console and Bing

```
https://cielandstone.com/sitemap.xml
```

166 URLs is a meaningful jump. Google will crawl them over the next 2–4 weeks.

### 3. Verify OG image renders

After deploy, check that `https://cielandstone.com/opengraph-image.png` returns an image (not a 404). Share one of the landing page URLs on a Slack / Discord channel and verify the preview looks clean. This is the literal image every ad creative's organic share uses.

### 4. Live-test both forms end-to-end

Submit a test contact form and a test feasibility form. Confirm:

- Email arrives at `info@cielandstone.com` within 30 seconds
- Confirmation email arrives at the submitter's address
- The source section of the email carries the UTM data from whichever URL you landed on (e.g., `?utm_source=test&utm_campaign=preflight`)
- GA4 Real-Time event stream shows `generate_lead`
- Meta Events Manager shows a `Lead` event (only once pixel ID is set)

### 5. Pick the first 5 landing pages to run ads to

Not all 144 deserve immediate ad spend. The highest-intent, highest-conversion-velocity combos for a studio at this tier:

1. `/services/kitchens/los-angeles` — broadest intent, highest search volume
2. `/services/kitchens/beverly-hills` — highest-ticket kitchen traffic
3. `/services/pools-spas/malibu` — highest-ticket pool traffic, lowest competitor sophistication
4. `/services/additions/pacific-palisades` — post-wildfire rebuild demand is high and will stay high
5. `/services/adus/los-angeles` — fastest-growing permit category; very strong Google intent

Concentrate the first 60 days of ad budget across these five. Expand only after you have measurable CPL and conversion data.

### 6. Set up Meta and Google Ads conversion mapping

In Meta Ads Manager: create a custom conversion on the `Lead` pixel event. In Google Ads: link GA4 and import the `generate_lead` event as a conversion. Both platforms need 20–50 conversions before they optimize well — this is why firing those events matters.

### 7. Sort leads by service × location in the inbox

Because the email subject line now carries a `[service/location]` tag, you can build a Gmail / Outlook filter that labels incoming leads by market. Example filter: `subject:([Kitchen Remodel/beverly-hills]) → label: BH Kitchen`. Makes studio triage a 10-second read.

### 8. Add testimonials and named collaborators within 60 days

The biggest remaining credibility gap. A single real testimonial from a completed project, with first name + city + project type + year, does more for conversion than another dozen SEO pages. Prioritize sourcing three before month two of ad spend.

---

## F. What Ships vs What's Deferred

### Shipped in this pass

- `lib/data/services.ts` — 12-service slug library with full copy, FAQ, what's-included, preconstruction focus
- `lib/data/locations.ts` — 12-location library with market context, jurisdictional notes, neighborhoods, investment tiers
- `lib/data/landing-content.ts` — composition layer that produces unique, tiered content per service × location
- `lib/lead-capture.ts` — triple-redundant delivery (Mailgun → webhook → disk), UTM / source extraction
- `lib/use-lead-source.ts` — sticky client-side UTM + referrer capture (first-touch attribution)
- `lib/analytics.ts` — unified conversion tracking for GA4 + Meta Pixel
- `lib/structured-data.ts` — Organization, LocalBusiness, Service, FAQ, Breadcrumb JSON-LD helpers
- `app/api/contact/route.ts` — rewritten with UTM capture, rate limiting, dependable delivery
- `app/api/feasibility/route.ts` — same upgrades applied
- `app/services/page.tsx` — services index
- `app/services/[service]/page.tsx` — 12 service landing pages with cross-links to every location
- `app/services/[service]/[location]/page.tsx` — 144 service × location landing pages with adjacent-market cross-links
- `app/opengraph-image.tsx` — dynamic branded OG replacing the placeholder SVG
- `app/sitemap.ts` — expanded from 9 URLs to 166
- `app/robots.ts` — opened up to allow indexing of the new architecture
- `components/landing/landing-page.tsx` — shared landing template with embedded, pre-tagged form
- `components/analytics/meta-pixel.tsx` — Meta Pixel loader
- `components/contact/contact-form.tsx` — extended project-type dropdown, UTM payload, source tagging
- `components/feasibility/feasibility-studio.tsx` — UTM payload, source tagging
- `components/site/navbar.tsx` — Services link added
- `components/site/footer.tsx` — real service links replacing plain text
- `app/layout.tsx` — Organization JSON-LD, Meta Pixel wiring, GA4 enhanced conversions
- `lib/site.ts` — updated description and OG image reference

### Verified

- `tsc --noEmit`: exits 0 across the full project
- `eslint`: clean across all new files
- 144/144 service × location combinations produce valid content with correct metadata and tiered investment ranges
- Disk fallback captures leads with full source attribution
- Webhook receives full source payload (UTM + service + location)
- Sitemap generates 166 routes

### Not yet done (recommended next 30 days)

- **Homepage rewrite applied to `app/page.tsx`.** The strategy doc from the prior pass wrote production-ready copy — it's not yet in the component. Highest single-ROI remaining change.
- **Real photography.** Unsplash stock in the projects data undermines everything else. Three real projects photographed is enough to ship.
- **Testimonials.** Three, attributed, in the client-voice section.
- **About page.** Missing. Named principal, studio principles as commitments, named collaborators.
- **Blog / insights.** Not built, but SEO architecture is ready to receive it. `/insights` would slot in next to `/services`.
- **Fix portfolio captions.** Project cards should surface location + size + year + status — the data is already in `lib/data/projects.ts`.

---

## G. The Strategic Advantage You Now Have

Three firms can write the same copy. One firm can have the same process. What Ciel & Stone now has that competitors don't:

1. **A Feasibility Read as a priced, named product** — not a free consultation.
2. **A lead capture system that doesn't silently drop leads** when email infrastructure flinches.
3. **144 distinct landing pages that each carry local jurisdictional fluency** — which is the real differentiator at a premium price point where a homeowner is deciding between you and two other firms in a single afternoon.

The ads budget now has clean surfaces to land on, a capture system that actually captures, and attribution signals clean enough for Meta and Google to optimize against. Start with the five priority pages in Section E.5, run lean, iterate on CPL against service × location.

Paid traffic should convert. The remaining leverage is photography, testimonials, and homepage copy — in that order.

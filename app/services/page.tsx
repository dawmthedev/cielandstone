import type { Metadata } from "next";
import Link from "next/link";

import { services } from "@/lib/data/services";
import { locations } from "@/lib/data/locations";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential design-build services by Ciel & Stone — kitchens, baths, pools, additions, ADUs, theaters, wine rooms, wellness suites, and whole-home renovations across LA and the Pacific Northwest.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Ciel & Stone",
    description:
      "Residential design-build services by Ciel & Stone across LA and the Pacific Northwest.",
    url: `${siteConfig.url}/services`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  robots: { index: true, follow: true },
};

export default function ServicesIndex() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-36">
      <header className="max-w-4xl">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Services</div>
        <h1 className="mt-5 text-balance text-3xl leading-[1.02] tracking-[-0.04em] sm:text-6xl">
          The work we take on, with the clarity you&apos;d want up front.
        </h1>
        <p className="mt-6 max-w-3xl text-pretty text-sm leading-6 text-foreground/70 sm:text-lg sm:leading-8">
          Every project starts with a Feasibility Read — a written scope, investment range, and risk read before design spend accelerates. From there, we shape the work to match your scope, your site, and your standards.
        </p>
      </header>

      <section className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((svc) => (
          <Link
            key={svc.slug}
            href={`/services/${svc.slug}`}
            className="group flex flex-col gap-4 rounded-[22px] border border-black/10 bg-background/55 p-6 transition-colors hover:border-foreground/25 dark:border-white/10 dark:bg-white/5"
          >
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/55">
              {svc.category === "interior"
                ? "Interior"
                : svc.category === "exterior"
                ? "Exterior"
                : svc.category === "amenity"
                ? "Amenity"
                : "Structural"}
            </div>
            <h2 className="text-xl leading-[1.12] tracking-[-0.02em] sm:text-2xl">{svc.name}</h2>
            <div className="grid gap-1 text-xs text-foreground/55">
              <div>Typical range · {svc.investmentRange}</div>
              <div>Timeline · {svc.timelineRange}</div>
            </div>
            <div className="mt-auto text-sm text-foreground/75 group-hover:text-foreground">
              View {svc.shortName.toLowerCase()} →
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-20 rounded-[28px] border border-black/10 bg-background/40 p-8 dark:border-white/10 sm:p-12">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Markets</div>
        <h2 className="mt-4 text-balance text-2xl leading-[1.08] tracking-[-0.03em] sm:text-3xl">
          Where we work.
        </h2>
        <div className="mt-8 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/services/kitchens/${loc.slug}`}
              className="flex items-center justify-between gap-3 rounded-[14px] border border-black/8 bg-background/55 px-4 py-3 text-sm text-foreground/80 hover:border-foreground/20 dark:border-white/10 dark:bg-white/5"
            >
              <div>
                <div>{loc.name}</div>
                <div className="text-xs text-foreground/50">{loc.regionLabel}</div>
              </div>
              <span className="text-foreground/40">→</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

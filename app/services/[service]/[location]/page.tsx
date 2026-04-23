import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";

import { LandingPage } from "@/components/landing/landing-page";
import { getLandingContent } from "@/lib/data/landing-content";
import { services, serviceSlugs } from "@/lib/data/services";
import { locations, locationSlugs, getLocationBySlug } from "@/lib/data/locations";
import {
  breadcrumbSchema,
  faqSchema,
  localBusinessSchema,
  renderJsonLd,
  serviceSchema,
} from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";

/**
 * Pre-render every service × location intersection at build time. This is the
 * SEO engine — each combination becomes a distinct, indexable URL with its
 * own metadata, structured data, and on-page copy.
 */
export function generateStaticParams() {
  const params: { service: string; location: string }[] = [];
  for (const service of serviceSlugs) {
    for (const location of locationSlugs) {
      params.push({ service, location });
    }
  }
  return params;
}

type Params = { params: Promise<{ service: string; location: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { service, location } = await params;
  const content = getLandingContent(service, location);
  if (!content) return {};
  return {
    title: content.seo.title,
    description: content.seo.description,
    alternates: { canonical: content.seo.canonicalPath },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: `${siteConfig.url}${content.seo.canonicalPath}`,
      siteName: siteConfig.name,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: [siteConfig.ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ServiceLocationPage({ params }: Params) {
  const { service, location } = await params;
  const content = getLandingContent(service, location);
  if (!content || !content.location) notFound();

  const faqItems = [...content.service.faq, ...content.locationFaq];
  const ldBlocks = [
    localBusinessSchema(content.location),
    serviceSchema(content.service, content.location),
    faqSchema(faqItems),
    breadcrumbSchema([
      { name: "Home", url: siteConfig.url },
      { name: "Services", url: `${siteConfig.url}/services` },
      { name: content.service.shortName, url: `${siteConfig.url}/services/${content.service.slug}` },
      { name: content.location.name, url: `${siteConfig.url}${content.seo.canonicalPath}` },
    ]),
  ];

  return (
    <>
      {ldBlocks.map((block, i) => (
        <Script
          key={i}
          id={`ld-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={renderJsonLd(block)}
        />
      ))}
      <LandingPage content={content} />
      <RelatedCrossLinks currentService={service} currentLocation={location} />
    </>
  );
}

function RelatedCrossLinks({
  currentService,
  currentLocation,
}: {
  currentService: string;
  currentLocation: string;
}) {
  const loc = getLocationBySlug(currentLocation);
  const otherServices = services.filter((s) => s.slug !== currentService).slice(0, 6);
  const adjacentLocations = loc?.adjacentLocations
    .map((s) => locations.find((l) => l.slug === s))
    .filter(Boolean) ?? [];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] border border-black/10 bg-background/40 p-8 dark:border-white/10 sm:p-10">
          <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">
            Other services in {loc?.name}
          </div>
          <div className="mt-6 grid gap-2">
            {otherServices.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}/${currentLocation}`}
                className="flex items-center justify-between gap-3 rounded-[14px] border border-black/8 bg-background/55 px-4 py-3 text-sm text-foreground/80 hover:border-foreground/20 dark:border-white/10 dark:bg-white/5"
              >
                <span>{svc.shortName}</span>
                <span className="text-foreground/40">→</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] border border-black/10 bg-background/40 p-8 dark:border-white/10 sm:p-10">
          <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">
            Nearby markets
          </div>
          <div className="mt-6 grid gap-2">
            {adjacentLocations.map((nearby) =>
              nearby ? (
                <Link
                  key={nearby.slug}
                  href={`/services/${currentService}/${nearby.slug}`}
                  className="flex items-center justify-between gap-3 rounded-[14px] border border-black/8 bg-background/55 px-4 py-3 text-sm text-foreground/80 hover:border-foreground/20 dark:border-white/10 dark:bg-white/5"
                >
                  <span>{nearby.name}</span>
                  <span className="text-foreground/40">→</span>
                </Link>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

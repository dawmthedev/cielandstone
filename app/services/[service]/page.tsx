import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";

import { LandingPage } from "@/components/landing/landing-page";
import { getLandingContent } from "@/lib/data/landing-content";
import { services, serviceSlugs } from "@/lib/data/services";
import { locations } from "@/lib/data/locations";
import {
  breadcrumbSchema,
  faqSchema,
  renderJsonLd,
  serviceSchema,
} from "@/lib/structured-data";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return serviceSlugs.map((service) => ({ service }));
}

type Params = { params: Promise<{ service: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { service } = await params;
  const content = getLandingContent(service, null);
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

export default async function ServicePage({ params }: Params) {
  const { service } = await params;
  const content = getLandingContent(service, null);
  if (!content) notFound();

  const faqItems = [...content.service.faq, ...content.locationFaq];
  const ldBlocks = [
    serviceSchema(content.service),
    faqSchema(faqItems),
    breadcrumbSchema([
      { name: "Home", url: siteConfig.url },
      { name: "Services", url: `${siteConfig.url}/services` },
      { name: content.service.shortName, url: `${siteConfig.url}${content.seo.canonicalPath}` },
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
      <LocationCrossLinks currentService={content.service.slug} />
    </>
  );
}

function LocationCrossLinks({ currentService }: { currentService: string }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-24 sm:px-6">
      <div className="rounded-[28px] border border-black/10 bg-background/40 p-8 dark:border-white/10 sm:p-10">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">
          By location
        </div>
        <h2 className="mt-4 text-balance text-2xl leading-[1.08] tracking-[-0.02em] sm:text-3xl">
          Work in the market you&apos;re building in.
        </h2>
        <div className="mt-8 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {locations.map((loc) => {
            const service = services.find((s) => s.slug === currentService);
            if (!service) return null;
            return (
              <a
                key={loc.slug}
                href={`/services/${currentService}/${loc.slug}`}
                className="flex items-center justify-between gap-3 rounded-[14px] border border-black/8 bg-background/55 px-4 py-3 text-sm text-foreground/80 hover:border-foreground/20 dark:border-white/10 dark:bg-white/5"
              >
                <span>{loc.name}</span>
                <span className="text-foreground/40">→</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

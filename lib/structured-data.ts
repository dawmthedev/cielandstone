import type { Location } from "./data/locations";
import type { Service } from "./data/services";
import { siteConfig } from "./site";

/**
 * JSON-LD helpers. Inject as a <script type="application/ld+json">.
 * Every public page should carry at least an Organization or LocalBusiness node.
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/media/logo.png`,
    description: siteConfig.description,
    sameAs: [
      "https://www.instagram.com/cielandstone",
      "https://www.linkedin.com/company/cielandstone",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "info@cielandstone.com",
        contactType: "customer service",
        areaServed: ["US-CA", "US-OR", "US-WA"],
        availableLanguage: ["English"],
      },
    ],
  };
}

export function localBusinessSchema(location?: Location) {
  const base = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: location ? `${siteConfig.name} — ${location.name}` : siteConfig.name,
    url: location ? `${siteConfig.url}/services/${location.slug}` : siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    description: siteConfig.description,
    priceRange: "$$$$",
    email: "info@cielandstone.com",
    areaServed: [
      { "@type": "State", name: "California" },
      { "@type": "State", name: "Oregon" },
      { "@type": "State", name: "Washington" },
    ],
    serviceType: [
      "Residential design-build",
      "Luxury home renovation",
      "Custom home construction",
      "Preconstruction services",
      "Kitchen renovation",
      "Bathroom renovation",
      "Home addition",
      "Pool and spa construction",
    ],
  };
  if (location?.latLng) {
    return {
      ...base,
      address: {
        "@type": "PostalAddress",
        addressLocality: location.name,
        addressRegion: location.state,
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: location.latLng[0],
        longitude: location.latLng[1],
      },
    };
  }
  return base;
}

export function serviceSchema(service: Service, location?: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: location ? `${service.name} in ${location.name}` : service.name,
    description: service.metaDescription,
    provider: {
      "@type": "GeneralContractor",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: location
      ? { "@type": "City", name: location.name, addressRegion: location.state }
      : [
          { "@type": "State", name: "California" },
          { "@type": "State", name: "Oregon" },
          { "@type": "State", name: "Washington" },
        ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        description: `Typical investment range: ${service.investmentRange}`,
      },
    },
    termsOfService: `${siteConfig.url}/feasibility`,
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function breadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

/**
 * Render a JSON-LD script tag. Used server-side in page components.
 */
export function renderJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    __html: JSON.stringify(data),
  };
}

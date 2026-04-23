import React from "react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a residential design-build conversation with Ciel & Stone.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Ciel & Stone",
    description:
      "Start a measured conversation about your residential project.",
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Ciel & Stone",
    description:
      "Start a measured conversation about your residential project.",
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
      <header className="max-w-3xl">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Contact</div>
        <h1 className="mt-4 text-balance text-3xl leading-[1.02] tracking-[-0.04em] sm:text-6xl">
          Tell us about the home, the property, and the work you want to do carefully.
        </h1>
        <p className="mt-5 text-pretty text-sm leading-6 text-foreground/65 sm:mt-6 sm:text-lg sm:leading-7">
          Use the project brief form for renovations, additions, new homes, or early feasibility conversations. Every note
          routes to <span className="font-medium text-foreground">info@cielandstone.com</span>.
        </p>
      </header>

      <section className="mt-10 grid gap-6 md:mt-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <ContactForm />
        </div>
        <div className="grid gap-6 md:col-span-5">
          <div className="rounded-[28px] border border-black/10 bg-[var(--panel)] p-6 backdrop-blur dark:border-white/10 sm:p-8">
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Direct</div>
            <p className="mt-5 text-sm leading-6 text-foreground/65">
              Prefer email? Reach us directly at{" "}
              <a href="mailto:info@cielandstone.com" className="font-medium text-foreground hover:opacity-80">
                info@cielandstone.com
              </a>
              .
            </p>
            <div className="mt-8 text-xs tracking-[0.22em] uppercase text-foreground/60">Service Areas</div>
            <div className="mt-4 text-sm leading-6 text-foreground/70">Los Angeles / Pacific Northwest</div>
          </div>

          <div className="rounded-[28px] border border-black/10 bg-background p-6 dark:border-white/10 sm:p-8">
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Helpful To Include</div>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-foreground/68">
              <li>Project location and property type</li>
              <li>Whether this is a renovation, addition, or new build</li>
              <li>Any desired timeline or move-in target</li>
              <li>What currently feels uncertain or most important</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

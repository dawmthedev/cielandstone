import React from "react";

import { ContactForm } from "@/components/contact/contact-form";

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-32">
      <header className="max-w-3xl">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Contact</div>
        <h1 className="mt-4 text-balance text-4xl leading-[1.02] tracking-[-0.04em] sm:text-6xl">
          Tell us about the home, the property, or the change you&apos;re trying to make.
        </h1>
        <p className="mt-6 text-pretty text-base leading-7 text-foreground/65 sm:text-lg">
          Use the inquiry form for renovations, additions, new homes, or early feasibility conversations. All
          inquiries route to <span className="font-medium text-foreground">info@cielandstone.com</span>.
        </p>
      </header>

      <section className="mt-14 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <ContactForm />
        </div>
        <div className="grid gap-6 md:col-span-5">
          <div className="rounded-[28px] border border-black/10 bg-[var(--panel)] p-8 backdrop-blur dark:border-white/10">
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

          <div className="rounded-[28px] border border-black/10 bg-background p-8 dark:border-white/10">
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

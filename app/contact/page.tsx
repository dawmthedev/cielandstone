import React from "react";

import { ContactForm } from "@/components/contact/contact-form";

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-32">
      <header className="max-w-2xl">
        <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Contact</div>
        <h1 className="mt-4 text-balance text-4xl font-medium leading-[1.02] tracking-[-0.03em] sm:text-6xl">
          Let’s make something worth keeping.
        </h1>
        <p className="mt-6 text-pretty text-base leading-7 text-foreground/65 sm:text-lg">
          Share a site, a scope, or a simple intent. We’ll respond with clarity and next steps.
        </p>
      </header>

      <section className="mt-14 grid gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <ContactForm />
        </div>
        <div className="md:col-span-5">
          <div className="rounded-2xl border border-black/10 bg-background p-8 dark:border-white/10">
            <div className="text-xs tracking-[0.22em] uppercase text-foreground/60">Direct</div>
            <p className="mt-5 text-sm leading-6 text-foreground/65">
              Prefer email? Send a note to hello@cielandstone.studio.
            </p>
            <div className="mt-8 text-xs tracking-[0.22em] uppercase text-foreground/60">Locations</div>
            <div className="mt-4 text-sm leading-6 text-foreground/70">Los Angeles / Pacific Northwest</div>
          </div>
        </div>
      </section>
    </main>
  );
}

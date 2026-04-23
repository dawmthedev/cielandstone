import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[var(--panel)] backdrop-blur-xl dark:border-white/10">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-4 md:gap-10">
        <div className="space-y-3">
          <div className="text-xs tracking-[0.22em] uppercase text-foreground/80">Ciel & Stone</div>
          <p className="max-w-sm text-sm leading-6 text-foreground/65">
            A residential design-build and preconstruction studio helping homeowners move from early intent to a
            clear, buildable direction.
          </p>
        </div>
        <div className="space-y-3">
          <div className="text-xs tracking-[0.22em] uppercase text-foreground/80">Explore</div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-foreground/70 md:flex-col md:gap-2">
            <Link href="/projects" className="hover:text-foreground">
              Portfolio
            </Link>
            <Link href="/process" className="hover:text-foreground">
              Process
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-xs tracking-[0.22em] uppercase text-foreground/80">Services</div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-foreground/70 md:flex-col md:gap-2">
            <Link href="/services/kitchens" className="hover:text-foreground">
              Kitchens
            </Link>
            <Link href="/services/bathrooms" className="hover:text-foreground">
              Bathrooms
            </Link>
            <Link href="/services/pools-spas" className="hover:text-foreground">
              Pools & Spas
            </Link>
            <Link href="/services/additions" className="hover:text-foreground">
              Additions
            </Link>
            <Link href="/services/adus" className="hover:text-foreground">
              ADUs & Guest Houses
            </Link>
            <Link href="/services/whole-home" className="hover:text-foreground">
              Whole-Home Renovation
            </Link>
            <Link href="/services" className="hover:text-foreground text-foreground/50">
              All services →
            </Link>
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-xs tracking-[0.22em] uppercase text-foreground/80">Inquiries</div>
          <div className="text-sm leading-6 text-foreground/70">
            <div>Los Angeles · Portland · Seattle</div>
            <a href="mailto:info@cielandstone.com" className="hover:text-foreground">
              info@cielandstone.com
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-black/10 px-4 py-5 text-xs text-foreground/55 dark:border-white/10 sm:px-6 sm:py-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <div>© {new Date().getFullYear()} Ciel & Stone</div>
          <div className="tracking-[0.18em] uppercase">Residential Design • Visualization • Pre-Construction</div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[var(--panel)] backdrop-blur-xl dark:border-white/10">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-4">
        <div className="space-y-3">
          <div className="text-xs tracking-[0.22em] uppercase text-foreground/80">Ciel & Stone</div>
          <p className="max-w-sm text-sm leading-6 text-foreground/65">
            A residential design and pre-construction studio helping homeowners move from early intent to buildable
            direction with confidence.
          </p>
        </div>
        <div className="space-y-3">
          <div className="text-xs tracking-[0.22em] uppercase text-foreground/80">Explore</div>
          <div className="flex flex-col gap-2 text-sm text-foreground/70">
            <Link href="/projects" className="hover:text-foreground">
              Projects
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
          <div className="flex flex-col gap-2 text-sm text-foreground/70">
            <div>Home Renovations</div>
            <div>Additions + New Homes</div>
            <div>Visualization + BIM</div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-xs tracking-[0.22em] uppercase text-foreground/80">Inquiries</div>
          <div className="text-sm leading-6 text-foreground/70">
            <div>Los Angeles / Pacific Northwest</div>
            <a href="mailto:info@cielandstone.com" className="hover:text-foreground">
              info@cielandstone.com
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-black/10 px-6 py-6 text-xs text-foreground/55 dark:border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Ciel & Stone</div>
          <div className="tracking-[0.22em] uppercase">Residential Design • Visualization • Pre-Construction</div>
        </div>
      </div>
    </footer>
  );
}

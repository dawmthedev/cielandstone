"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

import { cn } from "@/lib/utils/cn";

const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(22,18,15,0.58)] via-[rgba(22,18,15,0.18)] to-transparent" />
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="pointer-events-auto inline-flex items-baseline gap-3 text-sm tracking-[0.18em] uppercase text-white"
        >
          <span className="font-semibold">Ciel</span>
          <span className="opacity-70">&</span>
          <span className="font-semibold">Stone</span>
        </Link>

        <nav className="pointer-events-auto hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-xs tracking-[0.22em] uppercase text-white/90 transition-opacity hover:opacity-100",
                  active ? "opacity-100" : "opacity-70",
                )}
              >
                {item.label}
              </Link>
            );
          })}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-xs font-medium tracking-[0.18em] uppercase text-black"
            >
            Start Inquiry
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Menu</span>
          <div className="grid gap-1.5">
            <span className={cn("block h-px w-4 bg-current", open ? "translate-y-1 rotate-45" : "")} />
            <span className={cn("block h-px w-4 bg-current", open ? "opacity-0" : "")} />
            <span className={cn("block h-px w-4 bg-current", open ? "-translate-y-2 -rotate-45" : "")} />
          </div>
        </button>
      </div>

      <div
        className={cn(
          "mx-4 overflow-hidden rounded-3xl border border-white/10 bg-[var(--panel)] shadow-[0_24px_80px_rgba(31,22,16,0.18)] backdrop-blur-xl md:hidden",
          open ? "pointer-events-auto max-h-[420px] opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <div className="grid gap-2 p-4">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm tracking-[0.16em] uppercase",
                  active ? "bg-foreground text-background" : "text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href="mailto:info@cielandstone.com"
            className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-[var(--accent-strong)] px-5 text-xs font-medium tracking-[0.18em] uppercase text-[var(--accent-contrast)]"
          >
            Email Info@Cielandstone.com
          </a>
        </div>
      </div>
    </header>
  );
}

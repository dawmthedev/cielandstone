"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils/cn";

const nav = [
  { href: "/projects", label: "Projects" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.35] via-black/[0.10] to-transparent dark:from-black/[0.55] dark:via-black/[0.20]" />
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="pointer-events-auto inline-flex items-baseline gap-3 text-sm tracking-[0.18em] uppercase text-white mix-blend-difference"
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
                className={cn(
                  "text-xs tracking-[0.22em] uppercase text-white/90 mix-blend-difference transition-opacity hover:opacity-100",
                  active ? "opacity-100" : "opacity-70",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
